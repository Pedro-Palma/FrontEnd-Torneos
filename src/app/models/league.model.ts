export class Leagues{
  constructor(
    public _id: String,
    public name: String,
    public owner: {
      _id: String,
      user: String
    },
    public country: String
  ){}
}
