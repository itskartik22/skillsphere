const Home = () => {
    const userName = 'Kartik Thakur'
    const userRole = 'Admin'
    return <div>
        <h1 className="w-full text-2xl text-white bg-gray-800 py-2 px-4">Hi, {userName} ({userRole})</h1>
    </div>
}

export default Home