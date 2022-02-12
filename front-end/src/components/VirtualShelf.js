import {Button} from "primereact/button";
import './style.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {OrderList} from "primereact/orderlist";
import {Link, useParams} from "react-router-dom";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {Card} from "primereact/card";




const VirtualShelf = () => {
    const [virtualshelfs,setVirtualshelfs]=useState([]);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [isEditing,setIsEditing]=useState(false);
    const [virtualshelf,setVirtualshelf]=useState({description:'',date:''});
    const [count,setCount]=useState(0)

    const handleModalOpen = () => {
        setIsModalOpened(true);

    };

    const handleInputChange = (e) => {
        setVirtualshelf({...virtualshelf, [e.target.name]:e.target.value});
    }

    const handleModalClose = () => {
        setIsModalOpened(false);
        setIsEditing(false);
    };

    const handleEditItem = (row) => {
        const item=(virtualshelfs.find(row2=>row2.id===row.id));
        setVirtualshelf({
            id:item.id,
            description: item.description,
            date:item.date
        })
        setIsEditing(true);
        handleModalOpen();
    }

    const handleDeleteItem = (row) => {
        const item=(virtualshelfs.find(row2=>row2.id===row.id));
        axios.delete(`http://localhost:8080/virtualshelf/${item.id}`)
            .then(() => {
                console.log('Deleted item!');
                setCount(count+1);

            })
            .catch((error) => {
                console.log('Error:',error);
                alert(error.response.data.message);

            })
    }

    const handleEdit = () => {
        axios.put(`http://localhost:8080/virtualshelf/${virtualshelf.id}`,virtualshelf)
            .then(() =>{
                setCount(count+1);
                handleModalClose();
            })
            .catch(error => {
                console.log('Error',error);
                alert(error.response.data.message);



            })

    }

    const handleVirtualShelf = () => {
        axios.post('http://localhost:8080/virtualshelf',virtualshelf)
            .then(res => {
                setCount(count+1);
                handleModalClose()
            })
            .catch(error => {
                console.log('Error',error);
                alert(error.response.data.message);

            })

    }

    const handleAddVirtualShelf = () => {
        setVirtualshelf({description: '',date:''});
        setIsEditing(false)
        handleModalOpen()
    }
    useEffect(() => {
        axios.get(`http://localhost:8080/virtualshelf`)
            .then(res => {
                setVirtualshelfs(res.data);
            })
    },[count])


    return (
        <>
            <div className="container">
                <h2 className={"h2-title"}>Virtual shelves</h2>
                <Button className={"btn"} onClick={handleAddVirtualShelf}>Add Virtual Shelf</Button>
                <div className={"content-container"}>


                    {virtualshelfs ? (
                        virtualshelfs.map(row => (
                            <Card title={row.description}  style={{ width: '25em', margin:'20px' }}>
                                <p className="m-0" style={{lineHeight: '1.5'}}>Date: {row.date}</p>
                                <div className="buttons-container">
                                    <Link to={`/book/${row.id}`}>
                                        <Button label="Books" />
                                    </Link>
                                    <Button label="Edit" onClick={()=> handleEditItem(row)} />
                                    <Button label="Delete" className={"p-button-danger"}  onClick={()=> handleDeleteItem(row)} />
                                </div>

                            </Card>
                        ))
                    ): null}
                </div>

                <Dialog header="Virtual Shelf" visible={isModalOpened} style={{ width: '50vw' }}  onHide={handleModalClose}>
                    <span className="p-float-label p-m-6">
                    <InputText id="description" name={"description"} value={virtualshelf.description} onChange={handleInputChange} />
                    <label htmlFor="description">Description</label>
                    </span>
                    <span className="p-float-label p-m-6">
                    <InputText id="date" name={"date"} value={virtualshelf.date} onChange={handleInputChange} />
                    <label htmlFor="date">Date</label>
                    </span>
                    {isEditing ? <Button className={"p-ml-6"} label={"Edit virtualshelf"} onClick={handleEdit}/>:<Button className={"p-ml-6"} label={"Add virtualshelf"} onClick={handleVirtualShelf}/>}
                </Dialog>

            </div>
        </>
    )

}

export default VirtualShelf;