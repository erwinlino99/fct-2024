from flask import Flask,jsonify,request
from flask_mysqldb import MySQL
from config import config
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app) 
connection=MySQL(app)

@app.route('/')
def index():
    return "API DE ERWIN"
# PARA USUARIOS -->
# PARA USUARIOS -->
# PARA USUARIOS -->

@app.route('/users',methods=['GET'])
def listUsers():
    try:
        cursor=connection.connection.cursor()
        sql="SELECT * from users"
        cursor.execute(sql)
        columns = [column[0] for column in cursor.description]
        users = [dict(zip(columns, row)) for row in cursor.fetchall()]
        return jsonify(users)
    except Exception as e:
        return e

@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    try:
        cursor = connection.connection.cursor()
        sql = f"SELECT * FROM users WHERE id = {id}"
        cursor.execute(sql)
        columns = [column[0] for column in cursor.description]
        user = [dict(zip(columns, row)) for row in cursor.fetchall()]
        return jsonify(user)
    except Exception as e:
        return str(e)

@app.route('/users', methods=['POST'])
def add_user():
    try:
        attribute = '{}'
        user_data = request.json
        cursor = connection.connection.cursor()
        sql = "INSERT INTO users (username, password_hash, email, wishlist, cart) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(sql, (user_data['username'], user_data['password_hash'], user_data['email'], attribute, attribute))
        connection.connection.commit()
        cursor.close()
        return "Usuario agregado correctamente."
    except Exception as e:
        return str(e)


# REVISION : FALTA HACER EL METODO DE MODIFICAR USUARIO, CONTRASEÑA ETC



# PARA LA LISTA DE DESEADOS/FAVORITOS --->
# PARA LA LISTA DE DESEADOS/FAVORITOS --->
# PARA LA LISTA DE DESEADOS/FAVORITOS --->

import json

@app.route('/wishlist/<int:id>', methods=['GET'])
def bringWishList(id):
    try:
        cursor = connection.connection.cursor()
        sql = f"SELECT wishlist FROM users WHERE id = {id}"
        cursor.execute(sql)
        result = cursor.fetchone()
        if result:
            wishlist = json.loads(result[0])  # Convertir la cadena JSON en una lista de Python
            return jsonify(wishlist)
        else:
            return "Usuario no encontrado"
    except Exception as e:
        return str(e)

    
    
#  REVISION: VER COMO HACER ESTO ---->    
import json

@app.route('/wishlist/<int:id>', methods=['POST'])
def addToWishList(id):
    try:
        item = request.json  # Obtener el elemento de la solicitud JSON
        cursor = connection.connection.cursor()
        # Obtener la lista de deseos actual del usuario
        cursor.execute(f"SELECT wishlist FROM users WHERE id = {id}")
        current_wishlist = cursor.fetchone()[0]
        # Convertir la lista de deseos actual a una lista de Python
        wishlist_list = json.loads(current_wishlist) if current_wishlist else []
        # Agregar el nuevo elemento a la lista de deseos
        wishlist_list.append(item)
        # Actualizar la lista de deseos en la base de datos
        cursor.execute("UPDATE users SET wishlist = %s WHERE id = %s", (json.dumps(wishlist_list), id))
        connection.connection.commit()
        cursor.close()
        return "Elemento agregado a la lista de deseos correctamente."
    except Exception as e:
        return str(e)

    
@app.route('/wishlist/<int:id>/<int:index>', methods=['DELETE'])
def removeFromWishList(id, index):
    try:
        cursor = connection.connection.cursor()
        # Construir y ejecutar la consulta SQL de actualización para eliminar el elemento de la lista de deseos
        sql = f"UPDATE users SET wishlist = JSON_REMOVE(wishlist, CONCAT('$[', %s, ']')) WHERE id = %s"
        cursor.execute(sql, (index, id))
        # Confirmar la acción de que se ha actualizado la lista de deseos
        connection.connection.commit()
        cursor.close()
        return "Elemento eliminado de la lista de deseos correctamente."
    except Exception as e:
        return str(e)


# PARA PRODUCTOS --->
# PARA PRODUCTOS --->
# PARA PRODUCTOS --->

@app.route('/products',methods=['GET'])
def listProduct():
    try:
        cursor=connection.connection.cursor()
        sql="SELECT * from products"
        cursor.execute(sql)
        columns = [column[0] for column in cursor.description]
        products = [dict(zip(columns, row)) for row in cursor.fetchall()]
        return jsonify(products)
    except Exception as e:
        return e
    
@app.route('/products/<int:id>', methods=['GET'])
def bringProduct(id):
    try:
        cursor = connection.connection.cursor()
        sql = f"SELECT * FROM products WHERE id = {id}"
        cursor.execute(sql)
        columns = [column[0] for column in cursor.description]
        # DE ESTA FORMA SE PUEDEN VER CLAVE-VALOR
        products = [dict(zip(columns, row)) for row in cursor.fetchall()]
        return jsonify(products)
    except Exception as e:
        return str(e)
    
@app.route('/products', methods=['POST'])
def addProduct():
    try:
        # Obtener los datos del producto del cuerpo de la solicitud JSON
        product_data = request.json
        # Conectar a la base de datos
        cursor = connection.connection.cursor()
        # Construir y ejecutar la consulta SQL de inserción
        sql = "INSERT INTO products (name, category, price, stock) VALUES (%s, %s, %s, %s)"
        cursor.execute(sql, (product_data['name'], product_data['category'], product_data['price'], product_data['stock']))
        # Confirmar la accion de que se ha metido en la BBDD
        connection.connection.commit()
        cursor.close()
        return "Productor registrado correctamente"
    except Exception as e:
        return str(e)


# HAY QUE VERIFICAR QUE ESE PRODUCTO EXISTE -->
@app.route('/products/<int:id>', methods=['DELETE'])
def removeProduct(id):
    try:
        cursor = connection.connection.cursor()
        sql = "DELETE FROM products WHERE id = %s"
        cursor.execute(sql, (id,))
        connection.connection.commit()
        cursor.close()
        return "Producto eliminado correctamente."
    
    except Exception as e:
        return str(e)
    
@app.route('/products/<int:id>', methods=['PUT'])
def updateProduct(id):
    try:
        new_price = request.json.get('price')
        cursor = connection.connection.cursor()
        
        sql = "UPDATE products SET price = %s WHERE id = %s"
        cursor.execute(sql, (new_price, id))
        connection.connection.commit()
        cursor.close()
        return "Precio del producto actualizado correctamente."
    
    except Exception as e:
        # En caso de error, devolver el mensaje de error
        return str(e)


# Cuando un endopint no existe -->
def not_found(error):
    return "<h1>Esta pagina no existe manin</h1>",404

if __name__ == '__main__':
    app.config.from_object(config['dev'])
    app.register_error_handler(404,not_found)
    app.run()
