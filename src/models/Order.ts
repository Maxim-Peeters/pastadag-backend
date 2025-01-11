import mongoose, { Document, Schema, Model, model } from "mongoose";

// Define an interface representing an order document in MongoDB.
interface IOrder extends Document {
  naam: string;
  email: string;
  aantalPortiesSpaghettiBolognese: number;
  aantalPortiesPastaPesto: number;
  aantalPortiesPastaPreiSpek: number;
  afhalenOfBinnenEten: 'afhalen' | 'binnen eten';
  uurAfhalenEten: Date;
  createdAt: Date;
  totaalAantalPorties?: number; // This is a virtual field
}

// Create a Schema corresponding to the document interface.
const OrderSchema: Schema<IOrder> = new Schema({
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
  afhalenOfBinnenEten: {
    type: String,
    enum: {
      values: ['afhalen', 'binnen eten'],
      message: '{VALUE} is niet geldig. Kies "afhalen" of "binnen eten"'
    },
    required: [true, 'Geef aan of u wilt afhalen of binnen eten']
  },
  uurAfhalenEten: {
    type: Date,
    required: [true, 'Tijd van afhalen/eten is verplicht'],
    validate: {
      validator: function (v: Date) {
        return v > new Date();
      },
      message: 'De tijd moet in de toekomst liggen'
    }
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
