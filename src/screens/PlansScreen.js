import { collection, getDocs, where, query, getDoc, setDoc, doc, onSnapshot, orderBy, limit } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from "@stripe/stripe-js"
import db from '../firebase';
import "./PlansScreen.css"
function PlansScreen() {
    
    const [ products, setProducts ] = useState([]);
    const [subscription, setSubscription] = useState(null);
    const user = useSelector(selectUser)

    
    useEffect(() => {
        getDocs(collection(doc(collection(db, 'customers'), user.uid), 'subscriptions')).then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                // console.log(subscription.data().role)
                setSubscription({
                    role: subscription.data(), 
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,

                })
            })
        })
    },[user.uid])



    useEffect(() => {
        // collection(db, "products").where('active', '==', true).get
        const q = query(collection(db, "products"), where("active", "==", true));

        getDocs(q).then(querySnapshot => {
            const products = {};
            querySnapshot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await getDocs(query(collection(productDoc.ref, 'prices')))
                
                priceSnap.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data(),
                    }
                })
                setProducts(products)
            })
        })
    },[])

    const loadCheckout = async (priceId) => {
        
        
        const loading = collection(doc(collection(db, 'customers'), user.uid), 'checkout_sessions');
        
        const tryThis = await setDoc(doc(loading), {
            price: priceId, 
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        })

        
        // const getThis = await getDoc(doc(loading))

        const getThis = await getDoc(doc(collection(db, 'customers'), user.uid), 'checkout_sessions')
        const getThose = collection(doc(collection(db, 'customers'), user.uid), 'checkout_sessions')
        // console.log(getThose)
        // console.log('---------------')
        const getDocssss = doc(db, 'customers', user.uid)
        const tryTry = await getDocs(collection(doc(collection(db, 'customers'), user.uid), 'checkout_sessions'))
        const order1 = query(collection(doc(collection(db, 'customers'), user.uid), 'checkout_sessions'), orderBy('created', 'desc'), limit(1))
        const anotherTry = await getDocs(order1)

        anotherTry.forEach(async(doc) => {
            const { error, sessionId } = doc.data();

            if (error) {
                alert(`An error occurred! ${error.message}`)
            }

            if(sessionId){
                const stripe = await loadStripe('pk_test_51MSUA0GTbQI8zDwvbXQVzTiVpOjrMtwQBNy96bQiS6FpcVr8Ri2BGTJ6aSSNiUuQxrRX8rBmDzT2qsNnyiOCzaUi00Y6LsUPMh')

                stripe.redirectToCheckout({ sessionId })
            }
        })
        // const idk = doc(collection(doc(collection(db, 'customers'), user.uid), 'checkout_sessions'))
       
       
        
    //    console.log(collection(db, 'customers', user.uid))
        
      
         
       

        
        // onSnapshot(order1, async (snap) => {
        //     const { error, sessionId } = snap.val();
        //     console.log(snap)
          
        //     if (error) {
        //         alert(`An error occured!!!!!!! ${error.message}`)
        //     }

        //     if(sessionId) {
               
                // const stripe = await loadStripe('pk_test_51MSUA0GTbQI8zDwvbXQVzTiVpOjrMtwQBNy96bQiS6FpcVr8Ri2BGTJ6aSSNiUuQxrRX8rBmDzT2qsNnyiOCzaUi00Y6LsUPMh')

                // stripe.redirectToCheckout({ sessionId })
        //     }
        // })
        
     }

     

  return (
    <div className='plansScreen'>
        {subscription && <p>Renewal date: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}</p>}
        
        {Object.entries(products).map(([productId, productData]) => {
           
                const isCurrentPackage = productData?.name.toLowerCase().includes(subscription?.role.role)
                console.log(new Date(subscription.current_period_end * 1000))
            return (

                <div key={productId}
                    className={`${isCurrentPackage && "plansScreen__plan--disabled"} plansScreen__plan`}> 
                    <div className='plansScreen__info'>
                    <h5>{productData.name}</h5>
                    <h6>{productData.description}</h6> 
                    </div>

                    <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                        {isCurrentPackage ? `Current Package` : 'Subscribe'}
                    </button>
                </div>
            )
        })}
    </div>
  )
}

export default PlansScreen