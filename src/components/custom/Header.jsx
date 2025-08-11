import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className='p-3 px-5 flex justify-between shadow-md'>
            <Link to={'/'}>
                <img src='/vite.svg' className='cursor-pointer' width={40} height={40} />
            </Link>
            <div className='flex gap-2 items-center'>
                <Link to={'/'}>
                    <Button variant="outline">Dashboard</Button>
                </Link>
                <div className="text-sm text-gray-600">
                    Interactive Resume Builder
                </div>
            </div>
        </div>
    )
}

export default Header