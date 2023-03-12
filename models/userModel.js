const {model,Schema } = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        minlangth:4,
        trim:true
    },
    email:{
        type:String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address']
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    passwordConfirm:{
        type:String,
        required:true,
        validate:{
            validator:function(el){
                // This only work on CREATE and SAVE
                return el === this.password
            }
        }
    },
    photo:String,
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date

},{timestamps:true});

// Hashing PASSWORD using by Bcrypt {pre Hook}
userSchema.pre('save', async function(next){
    // only hash the password if it has been modified (or is new)
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,11);
    // Delete passwordConfirm field coz doesn't need to save passwordConfirm Field in DB
    this.passwordConfirm = undefined;
})


const User = model('User',userSchema);
module.exports = User;