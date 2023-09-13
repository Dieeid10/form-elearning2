export function Img ({ classInfo, src, alt }) {
    return (
        <img className={classInfo} src={src} alt={alt} />
    )
}