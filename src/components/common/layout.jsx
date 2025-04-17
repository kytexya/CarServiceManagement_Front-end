import Header from '@/components/common/header';
import Footer from '@/components/common/footer';

export default function Layout({ children }) {
    return (
        <div className='w-[100vw] h-[100vh] flex flex-col justify-between overflow-auto'>
            <Header />
            <main className="my-10">{children}</main>
            <Footer />
        </div>
    );
}