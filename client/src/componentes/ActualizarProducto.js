import React, {useState, useEffect} from "react";
import axios from "axios"
import { useParams, useHistory, Link } from "react-router-dom";

const ActualizarProducto = () => {

    const {id} = useParams();
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    
    const history = useHistory();

    // se ejecuta el useEffect cada que se cambie la variable que esta en [ ]
    useEffect(() => {
        axios.get("http://localhost:8000/api/productos/"+ id)
        .then(res =>{
            setNombre(res.data.nombre);
            setPrecio(res.data.precio);
            setDescripcion(res.data.descripcion);
        }) 
        .catch(err => console.log(err));
    }, [id]);

    //Función de actualización
    const updateProducto = e => {
        e.preventDefault();
        axios.put("http://localhost:8000/api/productos/"+ id, {
            nombre,
            precio,
            descripcion
        })
            .then(res => history.push("/"))
            .catch(err => console.log(err));
    }

    const borrarProducto = id => {
        axios.delete("http://localhost:8000/api/productos/" + id)
    }

    return(
        <div>
            <h1>Editar Producto</h1>
            <form onSubmit={updateProducto}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" className="form-control" value={nombre} onChange={e=>setNombre(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="precio">Precio:</label>
                    <input type="number" id="precio" name="precio" className="form-control" value={precio} onChange={e=>setPrecio(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="descripcion">Descripción:</label>
                    <input type="text" id="descripcion" name="descripcion" className="form-control" value={descripcion} onChange={e=>setDescripcion(e.target.value)} />
                </div>
                <input type="submit" value="Guardar" className="btn btn-success m-2" />
                <Link to="/" className="btn btn-danger m-2">Cancelar</Link>
                <Link to="/" onClick={() => borrarProducto(id)} className="btn btn-warning m-2">Eliminar</Link>
            </form>
        </div>
    )
}

export default ActualizarProducto;