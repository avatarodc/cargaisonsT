// import jsPDF from 'jspdf';

// async function addProductToCargo(cargoId, payload) {
//   console.log("Adding product to cargo:", payload);

//   try {
//     // Générer un code unique pour le produit
//     const productCode = generateProductCode();
//     console.log("Generated product code:", productCode);

//     // Ajouter le code de produit à la payload
//     payload.codeProduit = productCode;
//     let recep = payload.recepteurTelephone;
//     let dest = payload.emetteurTelephone;

//     const response = await fetch(`../php/api.php?ajouter=${cargoId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     sendMail("tout");
//     // sendSms(recep, dest, "Bonjour tres cher(e), votre produit a bien ete ajouté.");

//     if (!response.ok) {
//       throw new Error("Failed to add product to cargo");
//     }

//     const data = await response.json();
//     console.log("Product added to cargo:", data);

//     // Créer un fichier PDF avec les détails du produit
//     const doc = new jsPDF();
//     doc.text("Détails du Produit", 10, 10);
//     doc.text(`Code Produit: ${productCode}`, 10, 20);
//     doc.text(`Nom Produit: ${payload.nomProduit}`, 10, 30);
//     doc.text(`Quantité: ${payload.quantite}`, 10, 40);
//     doc.text(`Récepteur: ${payload.recepteurTelephone}`, 10, 50);
//     doc.text(`Émetteur: ${payload.emetteurTelephone}`, 10, 60);

//     // Télécharger le fichier PDF
//     doc.save(`Details_Produit_${productCode}.pdf`);

//     return data;
//   } catch (error) {
//     console.error("Error adding product to cargo:", error);
//     throw error;
//   }
// }
