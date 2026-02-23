//Os nomes presentes na inteface devem ser os mesmos da api.
{/* 
    - O json que o java manda envia o nome da variavel presente dentro do proprio java.
    - O feach do front pega esse json que a api maondou e transforma em um objeto js.
    - Se os nomes das variavie tanto do type e do java forem diferentes vai dar um erro de espaço em branco.
    
    */}
export interface Produto {
    id : number,
    name: string,
    price: number,
    type : string,
    marca: string,
    socket: string,
    cores_processer: string,
    image_text: string,
    isDisponivel: boolean,
} 