import { Password } from "./../services/password";
import mongoose from "mongoose";

//Interface para descrever as propriedades de um novo usuario
interface UserAttrs {
  email: string;
  password: string;
}

//interfacce que o documento do banco tem
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

//interface que fala as propriedades que o modelo tem
// assim o typescrip indentifica metodos staticos adicionados no schema
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//schema do documento do banco
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  //formata a saida do objeto removendo as propriedades que não dejesa visualizar e renomenado outras
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);
//sempre que savar criptografa a senha
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

//cria uma função para criar o novo usuario com o model correto
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
