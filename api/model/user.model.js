const mongoose = require("mongoose");

// define a mongoose user schema
const userSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 30,
        },
        age: {
            type: Number,
            required: false,
        },
        customers: {
            type: Array,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    const user = this;

    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
