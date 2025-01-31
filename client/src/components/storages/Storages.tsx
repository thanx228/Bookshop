import React, {useEffect, useState} from 'react';
import {Main} from '../../styles/Component.styles';
import './storages.scss'
import '../../styles/animations.scss'
import Axios from "axios";
import {Product} from "../user/Profile";
import {v4} from "uuid";

type Storage = {
    city: string,
    capacity: number,
    name: string,
    id: number,
}

const Storages = () => {
    const [storages, setStorages] = useState<Storage[]>([]);

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/storages`)
            .then((response) => {
                setStorages(response.data)
            }).catch((response) => {
            console.log(`[Storage] ERROR!`);
            console.log(response)
        });
    }, [])

    return (
        <Main>
            <div className="storages">
                <h1>Storages</h1>

                <div className="storages-container">
                    {storages.map(s => <Storage key={s.id} storageInfo={s}/>)}
                </div>
            </div>
        </Main>
    );
};

type StorageProps = {
    storageInfo: Storage
}

const Storage: React.FC<StorageProps> = ({storageInfo}) => {
    const [products, setProducts] = useState([]);
    const [showProducts, setShowProducts] = useState(false);

    function handleShowProducts() {
        Axios.get(`http://localhost:3001/api/storages/${storageInfo.id}`)
            .then((response) => {
                setProducts(response.data)
            }).catch((response) => {
            console.log(`[Storage] ERROR!`);
            console.log(response)
        });

        setShowProducts(!showProducts);
    }

    return (
        <div className="storage-wrap">
            <h2>Name: {storageInfo.name}</h2>
            <h2>City: {storageInfo.city}</h2>
            <h2>Capacity: {storageInfo.capacity}</h2>

            <div className="product-info-wrap">
                <div className="title-wrap">
                    <h2>Products</h2>
                    <img className="down-arrow" src="http://assets.stickpng.com/images/58f8bcf70ed2bdaf7c128307.png"
                         alt="arrow"
                         onClick={handleShowProducts}
                    />
                </div>


                {
                    showProducts ?
                        <div className="product-container appear">
                            <table className="table table-light">
                                <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Product Genre</th>
                                    <th>Product Price</th>
                                    <th>Quantity</th>
                                </tr>
                                </thead>

                                <tbody>
                                {products.map(p => <Product key={v4()} productInfo={p}/>)}
                                </tbody>
                            </table>
                        </div>
                        : <></>
                }


            </div>

        </div>
    );
};

export default Storages;