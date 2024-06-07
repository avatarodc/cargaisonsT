"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routiere = exports.Aerienne = exports.Maritime = exports.Cargaison = void 0;
var produit_1 = require("../produit");
var Cargaison = /** @class */ (function () {
    function Cargaison(distance, dateDepart, dateArrivee, poidsMax, produitMax, type, lieu_depart, lieu_arrivee, modeRemplissage) {
        this.produits = [];
        this.etatAvancement = "En cours";
        this.etat_globale = "Ouvert";
        this.id = LocalIdGenerator.incrementer();
        this.numero = this.genererNumero();
        this.poidsMax = poidsMax;
        this.produitMax = produitMax;
        this.prixTotal = 0;
        this.lieu_depart = lieu_depart;
        this.lieu_arrivee = lieu_arrivee;
        this.dateDepart = this.formatDate(new Date(dateDepart));
        this.dateArrivee = this.formatDate(new Date(dateArrivee));
        this.modeRemplissage = modeRemplissage;
        this.type = type;
        this.distanceKm = distance;
    }
    Cargaison.prototype.ajouterProduit = function (produit) {
        if (!this.estCargaisonValide(produit)) {
            return;
        }
        if (produit instanceof produit_1.Chimique && !(this instanceof Maritime)) {
            alert("Les produits chimiques doivent toujours transiter par voie maritime.");
            return;
        }
        this.produits.push(produit);
        this.prixTotal += this.calculerFrais(produit);
    };
    Cargaison.prototype.estCargaisonValide = function (produit) {
        if (this.etat_globale !== "Ouvert" || this.etatAvancement !== "En cours") {
            alert("Impossible d'ajouter un produit : la cargaison n'est pas ouverte ou est en attente.");
            return false;
        }
        if ((this.produitMax && this.nbProduits() >= this.produitMax) || (this.poidsMax && this.sommePoids() + produit.poids > this.poidsMax)) {
            alert("Impossible d'ajouter un produit : la cargaison est pleine.");
            return false;
        }
        return true;
    };
    Cargaison.prototype.genererNumero = function () {
        return "GP".concat(this.id.toString().padStart(3, '0'));
    };
    Cargaison.prototype.formatDate = function (date) {
        var day = String(date.getUTCDate()).padStart(2, '0');
        var month = String(date.getUTCMonth() + 1).padStart(2, '0');
        var year = date.getUTCFullYear();
        return "".concat(day, "/").concat(month, "/").concat(year);
    };
    Cargaison.prototype.sommeTotale = function () {
        var _this = this;
        return this.produits.reduce(function (total, produit) { return total + _this.calculerFrais(produit); }, 0);
    };
    Cargaison.prototype.sommePoids = function () {
        return this.produits.reduce(function (total, produit) { return total + produit.poids; }, 0);
    };
    Cargaison.prototype.nbProduits = function () {
        return this.produits.length;
    };
    return Cargaison;
}());
exports.Cargaison = Cargaison;
var Maritime = /** @class */ (function (_super) {
    __extends(Maritime, _super);
    function Maritime(distance, dateDepart, dateArrivee, poidsMax, produitMax, lieu_depart, lieu_arrivee, modeRemplissage) {
        return _super.call(this, distance, dateDepart, dateArrivee, poidsMax, produitMax, "maritime", lieu_depart, lieu_arrivee, modeRemplissage) || this;
    }
    Maritime.prototype.calculerFrais = function (produit) {
        return produit.poids * this.distanceKm * 90;
    };
    return Maritime;
}(Cargaison));
exports.Maritime = Maritime;
var Aerienne = /** @class */ (function (_super) {
    __extends(Aerienne, _super);
    function Aerienne(distance, dateDepart, dateArrivee, poidsMax, produitMax, lieu_depart, lieu_arrivee, modeRemplissage) {
        return _super.call(this, distance, dateDepart, dateArrivee, poidsMax, produitMax, "aerienne", lieu_depart, lieu_arrivee, modeRemplissage) || this;
    }
    Aerienne.prototype.calculerFrais = function (produit) {
        return produit.poids * this.distanceKm * 100;
    };
    return Aerienne;
}(Cargaison));
exports.Aerienne = Aerienne;
var Routiere = /** @class */ (function (_super) {
    __extends(Routiere, _super);
    function Routiere(distance, dateDepart, dateArrivee, poidsMax, produitMax, lieu_depart, lieu_arrivee, modeRemplissage) {
        return _super.call(this, distance, dateDepart, dateArrivee, poidsMax, produitMax, "routiere", lieu_depart, lieu_arrivee, modeRemplissage) || this;
    }
    Routiere.prototype.calculerFrais = function (produit) {
        return produit.poids * this.distanceKm * 300;
    };
    return Routiere;
}(Cargaison));
exports.Routiere = Routiere;
var LocalIdGenerator = /** @class */ (function () {
    function LocalIdGenerator() {
    }
    LocalIdGenerator.incrementer = function () {
        var dernierNumero = parseInt(localStorage.getItem(LocalIdGenerator.storageKey) || '0', 10);
        dernierNumero += 1;
        localStorage.setItem(LocalIdGenerator.storageKey, dernierNumero.toString());
        return dernierNumero;
    };
    LocalIdGenerator.reinitialiser = function () {
        localStorage.setItem(LocalIdGenerator.storageKey, '0');
    };
    LocalIdGenerator.storageKey = 'dernierNumero';
    return LocalIdGenerator;
}());
exports.default = LocalIdGenerator;
