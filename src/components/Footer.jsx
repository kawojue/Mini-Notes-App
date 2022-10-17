const Footer = () => {
    const getYear = new Date().getFullYear()
    return (
        <div className="px-2 py-1 bg-orange-300 text-center text-lg tracking-wider text-white mt-0.5">
            <h5>Copyright &copy; {getYear}</h5>
        </div>
    )
}

export default Footer