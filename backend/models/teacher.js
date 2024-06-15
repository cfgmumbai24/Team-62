const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const teacherSchema = new Schema(
    {
        teacherId: {
            type: String,
            unique: true,
            required: true
        },
        subject:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        }
    }
)
teacherSchema.pre('save', async function(next){  
   
    const salt= await bcrypt.genSalt(); //this is async
    this.password= await bcrypt.hash(this.password, salt)
    next();
})

const Teacher= mongoose.model('Teacher', teacherSchema);
module.exports=Teacher;