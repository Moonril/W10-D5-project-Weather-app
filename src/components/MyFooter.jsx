const MyFooter = function () {
    return (
        <footer className="py-3 footer text-center text-white">
            Weather today - {new Date().getFullYear()}
        </footer>
    )
}

export default MyFooter