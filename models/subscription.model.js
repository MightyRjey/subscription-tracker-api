import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription Name is required'],
        trim: true, // Trim whitespace from both sides of a string
        minLength: [3, 'Name must be at least 3 characters long'],
        maxLength: [50, 'Name must be at most 50 characters long']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0.01, 'Price must be at least 0.01'],
        max: [1000, 'Price must be at most 1000']
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP'],
        default: 'USD'
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        default: 'monthly'
    },
    category: {
        type: String,
        enum: ['Sports', 'Music', 'Gaming', 'Tech', 'Food', 'Travel', 'Business', 'Personal'],
        required: [true, 'Category is required']
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment Method is required'],
        trim: true, // Trim whitespace from both sides of a string
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'canceled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: [true, 'Start Date is required'],
        validate: {
            validator: (value) => value <= new Date(),
            message: (props) => `Start Date must be in the future`
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: (props) => `Start Date must be in the past`
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
        index: true
    }
}, {timestamps: true});


// Auto calculate renewal date if missing
subscriptionSchema.pre('save', function (next) {
    if(!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;