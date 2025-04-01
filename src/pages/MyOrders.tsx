import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import BookLongCard from '../components/Common/BookLongCard'
import Breadcrumbs from '../components/Common/Breadcrumbs'
import Placeholder from '../components/Common/Placeholder'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import bookCover1 from '../assets/images/BookCover1.png'
import bookCover2 from '../assets/images/BookCover2.png'
import bookCover3 from '../assets/images/BookCover3.png'
import bookCover4 from '../assets/images/BookCover4.png'
import bookCover5 from '../assets/images/BookCover5.png'
import bookCover6 from '../assets/images/BookCover6.png'
import bookCover7 from '../assets/images/BookCover7.png'
import bookCover8 from '../assets/images/BookCover8.png'
import bookCover9 from '../assets/images/BookCover9.png'
import { CgShoppingCart } from 'react-icons/cg'

const bookCovers = [
    bookCover1, bookCover2, bookCover3, bookCover4, bookCover5, bookCover6, bookCover7, bookCover8, bookCover9
]

function MyOrders() {

    const token = localStorage.getItem('token');

    const prevOrderList = useSelector((state: RootState) => state.prevOrderList.prevOrdersList)

    if (!token) return <Placeholder />

    return (
        <div>
            <Header container='home' />
            <div className='min-h-[83.75vh] max-w-6xl p-5 mx-auto flex flex-col gap-2 mt-2'>
                <Breadcrumbs container='order' />
                {
                    prevOrderList.length === 0 ? (
                        <div className="rounded-lg p-8 text-center">
                            <CgShoppingCart
                                className="mx-auto mb-6 text-gray-300"
                                size={80}
                            />
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                                No Previous Orders
                            </h2>
                            <p className="text-gray-500 mb-6">
                                You haven't placed any orders yet. Start exploring our books and make your first purchase!
                            </p>
                            <button
                                className="bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                onClick={() => window.location.href = '/home'}
                            >
                                Browse Books
                            </button>
                        </div>
                    ) : (<>
                        {
                            prevOrderList.map((order, index) => {
                                return (
                                    <div key={order} className='py-2'>
                                        <BookLongCard book={{ ...order, cover: bookCovers[index % bookCovers.length] }} container='order' />
                                    </div>
                                )

                            })
                        }
                    </>)

                }
            </div>
            <Footer />
        </div>
    )
}

export default MyOrders
