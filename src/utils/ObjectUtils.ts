export class ObjectUtils {

  static listNoNumberProperties(object: object){
    return Object.keys(object).filter((item) => {
      return isNaN(Number(item));
    });
  }

  static listUnsetdProperties(object: object){
    return Object.keys(object).filter((key: keyof typeof object) => {
      return object[key] === undefined || object[key] === null
    })
  }

}
