export class UserGradebookModel {
    constructor(
      public Name: string = '',
      public Email: string = '',
      public Score: number = 0,
      public TimeSpent: number = 0
    ) { }
}
