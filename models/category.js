const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
}, {timestamps: true});

// virtual field
// userSchema.virtual('password')
// .set(function(password){
//     this._password = password;
//     this.salt = uuidv1();
//     this.hashed_password = this.encryptPassword(password);
// })
// .get(function() {
//     return this._password;
// })

module.exports = mongoose.model("Category", categorySchema);