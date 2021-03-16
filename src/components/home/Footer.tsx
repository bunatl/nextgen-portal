export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            Developed by <a href="https://github.com/bunatl/">Lukas Bunat</a> in React with ❤
            <br></br>
            Source code available on <a href="https://github.com/bunatl/portalo" target="_blank" rel="noreferrer">GitHub</a>.
            <br></br>
            2020-{currentYear} &copy; All Rights Reserved
        </footer>
    )
}