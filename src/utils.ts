// utils.ts
export interface FormField {
    inputId: string;
    errorSpanId: string;
    validator?: (value: string) => { valid: boolean; errorMessage?: string };
}

export type SubmitCallback = (formData: { [key: string]: string }) => void;

export class Formulaire {
    private formId: string;
    private formFields: FormField[];
    private submitCallback: SubmitCallback;

    constructor(formId: string, formFields: FormField[], submitCallback: SubmitCallback) {
        this.formId = formId;
        this.formFields = formFields;
        this.submitCallback = submitCallback;
        this.initForm();
    }

    private initForm(): void {
        const form = document.getElementById(this.formId) as HTMLFormElement;
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    private handleSubmit(event: Event): void {
        event.preventDefault();
        const newData: { [key: string]: string } = {};
        let isValid = true;

        this.formFields.forEach(field => {
            const inputElement = document.getElementById(field.inputId) as HTMLInputElement | HTMLSelectElement;
            const value = inputElement.value.trim();
            const errorSpanId = field.errorSpanId;

            if (field.validator) {
                const validation = field.validator(value);
                isValid = this.handleValidation(validation, errorSpanId) && isValid;
                if (isValid) {
                    newData[field.inputId] = value;
                }
            }
        });

        if (isValid) {
            this.submitCallback(newData);
            this.resetForm();
        }
    }

    private handleValidation(validation: { valid: boolean; errorMessage?: string }, errorSpanId: string): boolean {
        const errorElement = document.getElementById(errorSpanId);
        if (errorElement) {
            errorElement.innerText = validation.errorMessage || '';
        }
        return validation.valid;
    }

    private resetForm(): void {
        this.formFields.forEach(field => {
            const inputElement = document.getElementById(field.inputId) as HTMLInputElement | HTMLSelectElement;
            if (inputElement) {
                if (inputElement instanceof HTMLSelectElement) {
                    inputElement.selectedIndex = 0;
                } else {
                    inputElement.value = '';
                }
            }
            this.handleValidation({ valid: true }, field.errorSpanId);
        });
    }
}

export const validators = {
    isNotEmpty: (value: string) => {
        const isValid = value.trim().length > 0;
        return {
            valid: isValid,
            errorMessage: isValid ? '' : 'Ce champ ne peut pas être vide.'
        };
    },
    isPositiveNumber: (value: string) => {
        const number = parseFloat(value);
        const isValid = !isNaN(number) && number > 0;
        return {
            valid: isValid,
            errorMessage: isValid ? '' : 'Le poids doit être un nombre positif.'
        };
    },
    isPositiveNumberNull: (value: string) => {
        if (value.trim() === '') {
            return {
                valid: true,
                errorMessage: ''
            };
        }
        const number = parseFloat(value);
        const isValid = !isNaN(number) && number > 0;
        return {
            valid: isValid,
            errorMessage: isValid ? '' : 'Le poids doit être un nombre positif.'
        };
    },
    isValidDate: (value: string) => {
        const date = new Date(value);
        const isValid = !isNaN(date.getTime());
        return {
            valid: isValid,
            errorMessage: isValid ? '' : 'La date n\'est pas valide.'
        };
    }
};




export function validateForm() {
    // Réinitialiser les messages d'erreur
    document.querySelectorAll('.error-message').forEach(function (el) {
        el.textContent = '';
    });

    let isValid = true;

    // Valider le champ libellé du produit
    const libelleProduit = document.getElementById('libelleProduit') as HTMLInputElement;
    const libelleProduitError = document.getElementById('libelleProduit-error') as HTMLElement;
    if (libelleProduit.value.trim() === '') {
        libelleProduitError.textContent = 'Veuillez entrer le libellé du produit.';
        isValid = false;
    }

    // Valider le champ prix du produit
    const prixProduit = document.getElementById('prixProduit') as HTMLInputElement;
    const prixProduitError = document.getElementById('prixProduit-error') as HTMLElement;
    if (prixProduit.value.trim() === '') {
        prixProduitError.textContent = 'Veuillez entrer le prix du produit.';
        isValid = false;
    }else if(!validators.isPositiveNumber(prixProduit.value) || !validators.isPositiveNumberNull(prixProduit.value)) {
        prixProduitError.textContent = 'Le prix doit être un nombre positif.';
        isValid = false;
    }

    // Valider le champ code du produit
    const codeProduit = document.getElementById('codeProduit') as HTMLInputElement;
    const codeProduitError = document.getElementById('codeProduit-error') as HTMLElement;
    if (codeProduit.value.trim() === '') {
        codeProduitError.textContent = 'Veuillez entrer le code du produit.';
        isValid = false;
    }

    // Valider le champ poids du produit
    const poidsProduit = document.getElementById('poidsProduit') as HTMLInputElement;
    const poidsProduitError = document.getElementById('poidsProduit-error') as HTMLElement;
    const poidsValue = poidsProduit.value.trim();

    if (poidsValue === '') {
        poidsProduitError.textContent = 'Veuillez entrer le poids du produit.';
        isValid = false;
    } else if (isNaN(parseFloat(poidsValue)) || parseFloat(poidsValue) <= 0) {
        poidsProduitError.textContent = 'Le poids doit être un nombre positif.';
        isValid = false;
    } else {
        poidsProduitError.textContent = ''; 
    }

    
    

    // Valider le champ nom de l'émetteur
    const emetteurNom = document.getElementById('emetteurNom') as HTMLInputElement;
    const emetteurNomError = document.getElementById('emetteurNom-error') as HTMLElement;
    if (emetteurNom.value.trim() === '') {
        emetteurNomError.textContent = 'Veuillez entrer le nom de l\'émetteur.';
        isValid = false;
    }

    // Valider le champ prénom de l'émetteur
    const emetteurPrenom = document.getElementById('emetteurPrenom') as HTMLInputElement;
    const emetteurPrenomError = document.getElementById('emetteurPrenom-error') as HTMLElement;
    if (emetteurPrenom.value.trim() === '') {
        emetteurPrenomError.textContent = 'Veuillez entrer le prénom de l\'émetteur.';
        isValid = false;
    }

    // Valider le champ adresse de l'émetteur
    const emetteurAdresse = document.getElementById('emetteurAdresse') as HTMLInputElement;
    const emetteurAdresseError = document.getElementById('emetteurAdresse-error') as HTMLElement;
    if (emetteurAdresse.value.trim() === '') {
        emetteurAdresseError.textContent = 'Veuillez entrer l\'adresse de l\'émetteur.';
        isValid = false;
    }

    // Valider le champ email de l'émetteur
    const emetteurEmail = document.getElementById('emetteurEmail') as HTMLInputElement;
    const emetteurEmailError = document.getElementById('emetteurEmail-error') as HTMLElement;
    if (emetteurEmail.value.trim() === '') {
        emetteurEmailError.textContent = 'Veuillez entrer l\'email de l\'émetteur.';
        isValid = false;
    }

    // Valider le champ téléphone de l'émetteur
    const emetteurTelephone = document.getElementById('emetteurTelephone') as HTMLInputElement;
    const emetteurTelephoneError = document.getElementById('emetteurTelephone-error') as HTMLElement;
    if (emetteurTelephone.value.trim() === '') {
        emetteurTelephoneError.textContent = 'Veuillez entrer le téléphone de l\'émetteur.';
        isValid = false;
    }

    // Valider le champ nom du récepteur
    const recepteurNom = document.getElementById('recepteurNom') as HTMLInputElement;
    const recepteurNomError = document.getElementById('recepteurNom-error') as HTMLElement;
    if (recepteurNom.value.trim() === '') {
        recepteurNomError.textContent = 'Veuillez entrer le nom du récepteur.';
        isValid = false;
    }

    // Valider le champ prénom du récepteur
    const recepteurPrenom = document.getElementById('recepteurPrenom') as HTMLInputElement;
    const recepteurPrenomError = document.getElementById('recepteurPrenom-error') as HTMLElement;
    if (recepteurPrenom.value.trim() === '') {
        recepteurPrenomError.textContent = 'Veuillez entrer le prénom du récepteur.';
        isValid = false;
    }

    // Valider le champ adresse du récepteur
    const recepteurAdresse = document.getElementById('recepteurAdresse') as HTMLInputElement;
    const recepteurAdresseError = document.getElementById('recepteurAdresse-error') as HTMLElement;
    if (recepteurAdresse.value.trim() === '') {
        recepteurAdresseError.textContent = 'Veuillez entrer l\'adresse du récepteur.';
        isValid = false;
    }

    // Valider le champ email du récepteur
    const recepteurEmail = document.getElementById('recepteurEmail') as HTMLInputElement;
    const recepteurEmailError = document.getElementById('recepteurEmail-error') as HTMLElement;
    if (recepteurEmail.value.trim() === '') {
        recepteurEmailError.textContent = 'Veuillez entrer l\'email du récepteur.';
        isValid = false;
    }

    // Valider le champ téléphone du récepteur
    const recepteurTelephone = document.getElementById('recepteurTelephone') as HTMLInputElement;;
    const recepteurTelephoneError = document.getElementById('recepteurTelephone-error') as HTMLElement;
    if (recepteurTelephone.value.trim() === '') {
        recepteurTelephoneError.textContent = 'Veuillez entrer le téléphone du récepteur.';
        isValid = false;
    }

    return isValid;
}



