import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {v4} from "uuid";

import '../../styles/basket.scss'
import BasketProduct from "./BasketProduct";
import {BasketButton, Container, Main, PageTitle} from "../../styles/Component.styles";
import {numberWithSpaces} from "../../lib/helper";
import styled from "styled-components";

const BasketDetails = styled.div`
  padding: 10px;
  letter-spacing: 0;

`;

const BasketDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Basket() {
    const basket = useSelector(state => state.basket)

    let productsNum = 0;
    let sum = 0;

    basket.forEach(product => {
        productsNum += product.quantity;
        sum += product.quantity * product.price;
    })

    useEffect(() => {
        document.title = "Your basket"
    }, []);

    return (
        <Main>
            <PageTitle>Your basket</PageTitle>

            <div className="basket-page-wrap">
                {basket.length !== 0 ?
                    <BasketDetailsContainer>
                        <BasketDetails>
                            <img src="https://image.flaticon.com/icons/png/512/68/68892.png" alt={'basket'}
                                 style={{width: '20px', display: 'inline', marginRight: 5, marginBottom: 6}}/>
                            <span>
                                 You have {productsNum} item{productsNum === 1 ? '' : 's'} for a total of <b>{numberWithSpaces(sum)}</b> Ft in your basket.
                            </span>
                        </BasketDetails>

                        <BasketButton w={200} h={40}>
                            Checkout
                        </BasketButton>
                    </BasketDetailsContainer>
                    :
                    <div className="basket-empty">Your basket is empty!</div>
                }

                <div className="basket-page-container">
                    {basket.length !== 0 ?
                        basket.map(product => <BasketProduct product={product} key={v4()}/>)
                        :
                        null
                    }
                </div>
            </div>
        </Main>

    )
}