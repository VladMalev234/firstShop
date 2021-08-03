import React from 'react'
import PropTypes from 'prop-types'

//Рейтинг продукта в звездах, color - цвет который установлен по дефолту в этом же компоненте
const Rating = ({value, text, color}) => {
    return (
        <div className='rating' >
            <span>
                {/* проверка если значение рейтинга больше равно 1 добавляется полная звезда, если половине то половинка, или добавляется пустая звезда */}
                <i style={{color}}
                    className={
                        value >= 1 
                        ? 'fas fa-star' 
                        : value >= 0.5 
                        ? 'fas fa-star-half-alt' 
                        : 'far fa-star'
                    } >
                </i>
            </span>
            <span>
                <i style={{color}}
                    className={
                        value >= 2 
                        ? 'fas fa-star' 
                        : value >= 1.5 
                        ? 'fas fa-star-half-alt' 
                        : 'far fa-star'
                    } >
                </i>
            </span>
            <span>
                <i style={{color}}
                    className={
                        value >= 3 
                        ? 'fas fa-star' 
                        : value >= 2.5 
                        ? 'fas fa-star-half-alt' 
                        : 'far fa-star'
                    } >
                </i>
            </span>
            <span>
                <i style={{color}}
                    className={
                        value >= 4 
                        ? 'fas fa-star' 
                        : value >= 3.5 
                        ? 'fas fa-star-half-alt' 
                        : 'far fa-star'
                    } >
                </i>
            </span>
            <span>
                <i style={{color}}
                    className={
                        value >= 5 
                        ? 'fas fa-star' 
                        : value >= 4.5 
                        ? 'fas fa-star-half-alt' 
                        : 'far fa-star'
                    } >
                </i>
            </span>
            {/* Если это существует то покажи его */}
                <span>{text && text }</span>
        </div>
    )
}

// Установлен уцвет для звезд как дефолтный
Rating.defaultProps = {
    color: '#f8e825'
}
// проверка типов обязательно указаный тип
 Rating.propTypes = {
     value: PropTypes.number.isRequired,
     text: PropTypes.string.isRequired,
     color: PropTypes.string

 }

export default Rating
