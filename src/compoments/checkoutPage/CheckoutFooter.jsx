import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import axios from "axios";

import { API_URL } from "@env";
import Toast from "react-native-toast-message";

const CheckoutFooter = ({
  total,
  reduction = 0,
  onPaymentSuccess,
  onPaymentFailure,
  transactionId,
  apiKey,
  environment = "live",
  livraison,
  region,
  methode,
  deliveryInfo,
}) => {
  const [showWebView, setShowWebView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentPageHtml, setPaymentPageHtml] = useState(null);

  const getShippingCost = useCallback(() => {
    if (total > 20000) return 1500;
    if (total > 1000) return 1000;
    return 0;
  }, [total]);

  // const shippingCost = getShippingCost();
  // const finalTotal = total + shippingCost - reduction;
  const finalTotal = total - reduction;

  // Contenu HTML modifié pour mieux gérer le SDK
  const getWebViewContent = useCallback(
    () => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <script src="https://i-pay.money/checkout.js"></script>
        <style>
          body {
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f5f5f5;
          }
          .payment-container {
            width: 100%;
            max-width: 500px;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border:5px solid black;
            height:500px;
          }
          .ipaymoney-button {
            width: 100%;
            padding: 15px;
            background: #30A08B;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <div class="payment-container">
          <button
            type="button"
            class="ipaymoney-button"
            data-amount="${100}"
            data-environment="${environment}"
            data-key="${apiKey}"
            data-transaction-id="${transactionId}"
            data-redirect-url="https://ihambaobab.onrender.com/"
            data-callback-url="https://ihambaobab.onrender.com/"
          >
            Procéder au paiement
          </button>
        </div>

      </body>
    </html>
  `,
    [finalTotal, environment, apiKey, transactionId]
  );

  const handleCheckoutClick = () => {
    setIsLoading(true);
    setShowWebView(true);
  };

  const handleWebViewClose = () => {
    setShowWebView(false);
    setIsLoading(false);
  };

  const handleNavigationStateChange = (navState) => {
    console.log("Navigation state changed:", navState.url);

    if (navState.url.includes("succes.html")) {
      handleWebViewClose();
      onPaymentSuccess?.();
    } else if (navState.url.includes("failure.html")) {
      handleWebViewClose();
      onPaymentFailure?.();
    }
  };

  const handleWebViewMessage = (event) => {
    console.log("Message from WebView:", event.nativeEvent.data); // Ajoutez ceci pour le débogage
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "error") {
        Alert.alert("Erreur", data.message);
        handleWebViewClose();
      }
    } catch (error) {
      console.log("Parsing error:", error);
    }
  };

  const renderShippingInfo = () => {
    if (livraison === 0) return "Livraison gratuite";
    return `Livraison : ${livraison} CFA ${region ? region : ""}`;
  };

  const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.stringify(${total}));
})();`;

  function generateUniqueID() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Ajoute un zéro au début si le mois est < 10
    const day = String(now.getDate()).padStart(2, "0"); // Ajoute un zéro au début si le jour est < 10
    const hours = String(now.getHours()).padStart(2, "0"); // Ajoute un zéro au début si l'heure est < 10
    const minutes = String(now.getMinutes()).padStart(2, "0"); // Ajoute un zéro au début si la minute est < 10
    const seconds = String(now.getSeconds()).padStart(2, "0"); // Ajoute un zéro au début si la seconde est < 10

    // Concatène les différentes parties pour former l'identifiant unique
    const uniqueID = `${year}${month}${day}${hours}${minutes}${seconds}`;

    return uniqueID;
  }

  // Fonction pour récupérer la page de paiement
  // const fetchPaymentPage = async () => {
  //   const redirect_url = 'http://localhost:8080/payment_success';
  //   const callback_url = 'http://localhost:8080/payment_failure';
  //   try {
  //     const response = await fetch('http://localhost:8080/generate_payment_page', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ total: finalTotal, orderId: generateUniqueID(),redirect_url:redirect_url,callback_url:callback_url }),
  //     });
  //     const html = await response.text();
  //     console.log(html)
  //     setPaymentPageHtml(html);
  //   } catch (error) {
  //     console.error('Erreur lors de la récupération de la page de paiement:', error);
  //   }
  // };

  const fetchPaymentPage = async () => {
    const redirect_url = `${API_URL}/payment_success`;
    const callback_url = `${API_URL}/payment_callback`; // Modifiez cela pour utiliser le callback

    const commandeData = {
      clefUser: "dsqdqs",
      nbrProduits: 2,
      prix: 22222,
      codePro: 22222,
      idCodePro: 33333,
      reference: 23,
    };

    try {
      const response = await fetch(`${API_URL}/generate_payment_page`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          total: finalTotal,
          orderId: generateUniqueID(),
          redirect_url,
          callback_url,
          ...commandeData, // Ajoutez les données de la commande ici
        }),
      });

      const html = await response.text();

      setPaymentPageHtml(html);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la page de paiement:",
        error
      );
    }
  };

  // Appel de la fonction au chargement
  useEffect(() => {
    fetchPaymentPage();
  }, []);

  const showToast = (type, message) => {
    Toast.show({
      type,
      text1: message,
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  ////////////////////////////////////////////////////////////////////
  const handlePaymentSubmit = async (e) => {
    try {
      const userId = JSON.parse(localStorage.getItem("userEcomme"))?.id;
      if (!userId) {
        showToast(
          "error",
          "ID utilisateur non trouvé. Veuillez vous reconnecter."
        );
        return;
      }

      // Préparer les données de la commande
      const panier = JSON.parse(localStorage.getItem("panier"));
      if (!panier || panier.length === 0) {
        showToast("error", "Aucun produit n'est sélectionné.");
        return false;
      }

      const produits = panier.map((item) => ({
        produit: item._id,
        quantite: item.quantity,
        tailles: item.sizes,
        couleurs: item.colors,
      }));

      if (["Visa", "master Card", "Mobile Money"].includes(methode)) {
        try {
          // Vérifier si une commande en attente existe déjà
          const existingOrder = localStorage.getItem("pendingOrder");
          let commandeId;

          if (existingOrder) {
            // Utiliser la commande existante mais générer un nouveau transactionId
            const orderData = JSON.parse(existingOrder);
            commandeId = orderData.commandeId;

            // Obtenir la référence actuelle
            const currentReference = orderData.transactionId;

            // Générer un nouveau transactionId
            const newTransactionReference = generateUniqueID();

            // Mettre à jour la commande avec le nouveau transactionId
            await axios.put(`${API_URL}/updateCommande`, {
              clefUser: userId,
              nbrProduits: produits,
              prix: total,
              oldReference: currentReference,
              newReference: newTransactionReference,
              livraisonDetails: {
                customerName: deliveryInfo?.name,
                email: deliveryInfo?.email,
                region: deliveryInfo?.region,
                quartier: deliveryInfo?.quartier,
                numero: deliveryInfo?.numero,
                description: deliveryInfo?.description,
              },
              prod: panier,
              ...(orderCodeP?.isValide && {
                codePro: true,
                idCodePro: orderCodeP._id,
              }),
            });

            // Sauvegarder les informations de la commande avec le nouveau transactionId
            localStorage.setItem(
              "pendingOrder",
              JSON.stringify({
                commandeId,
                transactionId: newTransactionReference,
                timestamp: new Date().getTime(),
              })
            );
          } else {
            // Créer une nouvelle commande avec le transactionId
            const transactionId = generateUniqueID();
            const commandeData = {
              clefUser: userId,
              nbrProduits: produits,
              prix: orderTotal,
              statusPayment: "en attente",
              livraisonDetails: {
                customerName: deliveryInfo.name,
                email: deliveryInfo.email,
                region: deliveryInfo.region,
                quartier: deliveryInfo.quartier,
                numero: deliveryInfo.numero,
                description: deliveryInfo.description,
              },
              prod: panier,
              reference: transactionId,
              ...(orderCodeP?.isValide && {
                codePro: true,
                idCodePro: orderCodeP._id,
              }),
            };

            const response = await axios.post(
              `${BackendUrl}/createCommande`,
              commandeData
            );
            commandeId = response.data._id;

            // Sauvegarder les informations de la commande
            localStorage.setItem(
              "pendingOrder",
              JSON.stringify({
                commandeId,
                transactionId,
                timestamp: new Date().getTime(),
              })
            );
          }

          // Stocker les informations de paiement
          localStorage.setItem(
            "paymentInfo",
            JSON.stringify({
              amount: orderTotal,
              transactionId: JSON.parse(localStorage.getItem("pendingOrder"))
                .transactionId,
            })
          );

          // Rediriger vers la page de paiement
          window.location.href = "/payment.html";
        } catch (error) {
          console.error("Erreur:", error);
          alert("Une erreur est survenue lors de la création de la commande");
        }
      } else {
        // Paiement à la livraison
        const transactionId = generateUniqueID();
        const commandeData = {
          clefUser: userId,
          nbrProduits: produits,
          prix: orderTotal,
          statusPayment: "payé à la livraison",
          livraisonDetails: {
            customerName: deliveryInfo.name,
            email: deliveryInfo.email,
            region: deliveryInfo.region,
            quartier: deliveryInfo.quartier,
            numero: deliveryInfo.numero,
            description: deliveryInfo.description,
          },
          reference: transactionId,
          prod: panier,
          ...(orderCodeP?.isValide && {
            codePro: true,
            idCodePro: orderCodeP._id,
          }),
        };

        const response = await axios.post(
          `${BackendUrl}/createCommande`,
          commandeData
        );

        if (response.status === 200) {
          localStorage.removeItem("panier");
          localStorage.removeItem("orderTotal");

          if (orderCodeP?.isValide) {
            await axios.put(`${BackendUrl}/updateCodePromo`, {
              codePromoId: orderCodeP._id,
              isValide: false,
            });
            localStorage.removeItem("orderCodeP");
          }

          setSubmitStatus({
            loading: false,
            error: null,
            success: true,
          });
          setPaiementProduit(true);
        }
      }

      setOnSubmit(false);
    } catch (error) {
      console.error("Erreur:", error);
      setSubmitStatus({
        loading: false,
        error: error.message || "Une erreur est survenue",
        success: false,
      });
      setOnSubmit(false);
    }
  };
  ////////////////////////////////////////////////////////////////////

  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerDetails}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>
          {livraison ? finalTotal - livraison : finalTotal} CFA
        </Text>
        {reduction > 0 && (
          <Text style={styles.reductionText}>Reduction : {reduction} CFA</Text>
        )}
        <Text style={styles.shippingInfo}>{renderShippingInfo()}</Text>
      </View>

      <View style={styles.footerAction}>
        <TouchableOpacity
          style={[styles.buttonCheck, isLoading && styles.buttonDisabled]}
          onPress={handleCheckoutClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <>
              <Feather name="arrow-right-circle" size={24} color="white" />
              <Text style={styles.buttonText}>Passer la commande</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {showWebView && (
        <Modal
          visible={true}
          onRequestClose={handleWebViewClose}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleWebViewClose}
            >
              <Feather name="x" size={24} color="#333" />
            </TouchableOpacity>
            {/* <WebView */}
            {/* originWhitelist={['*']}
              source={require('./pay.html')} // Chargez le fichier HTML ici
              javaScriptEnabled={true}
              domStorageEnabled={true}
              scalesPageToFit={true}
              // injectedJavaScript={INJECTED_JAVASCRIPT}
              injectedJavaScriptObject={{ customValue: 'myCustomValue',prix:finalTotal,id:generateUniqueID() }}
              onNavigationStateChange={handleNavigationStateChange}
              onMessage={(event) => {
                const data = event.nativeEvent.data;
                console.log('Data from HTML:', data);
                // Vous pouvez gérer les données reçues ici
              }}
              style={styles.webview} */}
            {/* /> */}

            {paymentPageHtml ? (
              <WebView
                originWhitelist={["*"]}
                source={{ html: paymentPageHtml }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onNavigationStateChange={handleNavigationStateChange}
                onMessage={(event) => {
                  const data = event.nativeEvent.data;
                  console.log("Data from HTML:", data);
                }}
                style={styles.webview}
              />
            ) : (
              <Text>Chargement de la page de paiement...</Text>
            )}
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  footerDetails: {
    flex: 2,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#B17236",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#30A08B",
    marginVertical: 4,
  },
  reductionText: {
    fontSize: 16,
    color: "#e74c3c",
    fontWeight: "500",
  },
  shippingInfo: {
    fontSize: 14,
    color: "#B2905F",
    marginTop: 4,
  },
  footerAction: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCheck: {
    flexDirection: "row",
    backgroundColor: "#30A08B",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "125%",
    elevation: 3,
    marginRight: 15,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  webview: {
    flex: 1,
    marginTop: 100,
  },
});

export default CheckoutFooter;
