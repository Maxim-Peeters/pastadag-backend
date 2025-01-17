import mongoose, { Document, Schema, Model, model } from "mongoose";

// Define an interface representing an order document in MongoDB.
interface IOrder extends Document {
  status: 'Klaar' | 'Bezig' | 'Niet begonnen';
  naam: string;
  email: string;
  aantalPortiesSpaghettiBolognese: number;
  aantalPortiesPastaPesto: number;
  aantalPortiesPastaPreiSpek: number;
  aantalChocoMouse: number;
  aantalKoekjestaart: number;
  binnenAfhalen: 'afhalen' | 'binnen eten';
  tijd: string;
  createdAt: Date;
  totaalAantalPorties?: number; // This is a virtual field
}

// Create a Schema corresponding to the document interface.
const OrderSchema: Schema<IOrder> = new Schema({
  status: {
    type: String,
    enum: {
      values: ['Klaar', 'Bezig', 'Niet begonnen'],
      message: '{VALUE} is niet geldig. Kies "Klaar", "Bezig" of "Niet begonnen"'
    },
    required: [true, 'Status is verplicht'],
    default: 'Niet begonnen'
  },
  naam: {
    type: String,
    required: [true, 'Naam is verplicht'],
    trim: true,
    minlength: [2, 'Naam moet minimaal 2 karakters bevatten']
  },
  email: {
    type: String,
    required: [true, 'Email is verplicht'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v: string) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: 'Voer een geldig emailadres in'
    }
  },
  aantalPortiesSpaghettiBolognese: {
    type: Number,
    required: true,
    min: [0, 'Aantal porties kan niet negatief zijn'],
    default: 0
  },
  aantalPortiesPastaPesto: {
    type: Number,
    required: true,
    min: [0, 'Aantal porties kan niet negatief zijn'],
    default: 0
  },
  aantalPortiesPastaPreiSpek: {
    type: Number,
    required: true,
    min: [0, 'Aantal porties kan niet negatief zijn'],
    default: 0
  },
  aantalChocoMouse: {
    type: Number,
    required: true,
    min: [0, 'Aantal porties kan niet negatief zijn'],
    default: 0
  },
  aantalKoekjestaart: {
    type: Number,
    required: true,
    min: [0, 'Aantal porties kan niet negatief zijn'],
    default: 0
  },
  binnenAfhalen: {
    type: String,
    enum: {
      values: ['Afhalen', 'Binnen eten'],
      message: '{VALUE} is niet geldig. Kies "afhalen" of "binnen eten"'
    },
    required: [true, 'Geef aan of u wilt afhalen of binnen eten']
  },
  tijd: {
    type: String,
    required: [true, 'Tijd van afhalen/eten is verplicht'],
    
  },
  
}, {
  timestamps: true
});

// Validate that at least one pasta portion is ordered
OrderSchema.pre<IOrder>('save', function (next) {
  const totalPorties =
    (this.aantalPortiesSpaghettiBolognese || 0) +
    (this.aantalPortiesPastaPesto || 0) +
    (this.aantalPortiesPastaPreiSpek || 0);

  if (totalPorties === 0) {
    next(new Error('Bestel minimaal één portie pasta'));
  } else {
    next();
  }
});

// Add a virtual for the total number of portions
OrderSchema.virtual('totaalAantalPorties').get(function (this: IOrder) {
  return (
    (this.aantalPortiesSpaghettiBolognese || 0) +
    (this.aantalPortiesPastaPesto || 0) +
    (this.aantalPortiesPastaPreiSpek || 0)
  );
});

// Create and export the model
const Order = model<IOrder>('Order', OrderSchema);

export default Order;
