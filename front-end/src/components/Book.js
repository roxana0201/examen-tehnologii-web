import {Button} from "primereact/button";
import './style.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {OrderList} from "primereact/orderlist";
import {Link, useParams} from "react-router-dom";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {Card} from "primereact/card";




const Book = () => {
    const {id}=useParams();
    const [books,setBooks]=useState([]);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [isEditing,setIsEditing]=useState(false);
    const [book,setBook]=useState({title:'',genre:'',url:'',virtualshelfId:id});
    const [count,setCount]=useState(0)

    const handleModalOpen = () => {
        setIsModalOpened(true);
    };

    const handleInputChange = (e) => {
        setBook({...book, [e.target.name]:e.target.value});
    }

    const handleModalClose = () => {
        setIsModalOpened(false);
        setIsEditing(false);
    };

    const handleEditItem = (row) => {
        const item=(books.find(row2=>row2.id===row.id));
        setBook({
            id:item.id,
            title:item.title,
            genre:item.genre,
            url:item.url,
            virtualshelfId: id
        })
        setIsEditing(true);
        handleModalOpen();
    }

    const handleDeleteItem = (row) => {
        const item=(books.find(row2=>row2.id===row.id));
        axios.delete(`http://localhost:8080/book/${item.id}`)
            .then(() => {
                console.log('Deleted item!');
                setCount(count+1);

            })
            .catch((error) => {
                console.log('Error:',error.response.data.message);
                alert(error.response.data.message);

            })
    }

    const handleEdit = () => {
        axios.put(`http://localhost:8080/book/${book.id}`,book)
            .then(() =>{
                setCount(count+1);

                handleModalClose();
            })
            .catch(error => {
                console.log('Error',error);
                alert(error.response.data.message);

            })

    }

    const handleBook = () => {
        axios.post('http://localhost:8080/book',book)
            .then(res => {

                setCount(count+1);
                handleModalClose()
            })
            .catch(error => {
                console.log('Error',error);
                alert(error.response.data.message);

            })

    }

    const handleAddBook = () => {
        setBook({title:'',url:'',genre:'',virtualshelfId: id});
        setIsEditing(false)
        handleModalOpen()
    }


    useEffect(() => {
        axios.get(`http://localhost:8080/book/${id}`)
            .then(res => {
                setBooks(res.data);
                console.log('Book:',res.data);
            })
    },[count])


    return (
        <>
            <div className="container">
                <h2 className={"h2-title"}>Books</h2>
                <Button className={"btn"} onClick={handleAddBook}>Add book</Button>
                <div className={"content-container"}>


                {books ? (
                    books.map(row => (
                        <Card title={row.title}  style={{ width: '25em', margin:'20px' }}>
                            <p className="m-0" style={{lineHeight: '1.5'}}>Genre: {row.genre}</p>
                            <p className="m-0" style={{lineHeight: '1.5'}}>URL:<a target="_blank" rel="noopener noreferrer" href={row.url}>{row.title}</a></p>
                            <div className="buttons-container">

                                <Button label="Edit" onClick={()=> handleEditItem(row)} />
                                <Button label="Delete" className={"p-button-danger"}  onClick={()=> handleDeleteItem(row)} />
                            </div>

                        </Card>
                    ))
                ): null}
                </div>

                <Dialog header="Header" visible={isModalOpened} style={{ width: '50vw' }}  onHide={handleModalClose}>
                    <span className="p-float-label p-m-6">
                    <InputText id="title" name={"title"} value={book.title} onChange={handleInputChange} />
                    <label htmlFor="title">Title</label>
                    </span>
                    <span className="p-float-label p-m-6">
                    <InputText id="url" name={"url"} value={book.url} onChange={handleInputChange} />
                    <label htmlFor="url">URL</label>
                    </span>
                    <span className="p-float-label p-m-6">
                    <InputText id="genre" name={"genre"} value={book.genre} onChange={handleInputChange} />
                    <label htmlFor="genre">Genre (COMEDY,TRAGEDY)</label>
                    </span>
                    {isEditing ? <Button className={"p-ml-6"} label={"Edit book"} onClick={handleEdit}/>:<Button className={"p-ml-6"} label={"Add book"} onClick={handleBook}/>}
                </Dialog>

            </div>
        </>
    )

}

export default Book;