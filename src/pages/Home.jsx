import HumanGif from './Animation/Human.gif'

const Home = () => {
    return (
        <div style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div className="text-center p-4" style={{ background: 'rgba(255,255,255,0.85)', borderRadius: 12, maxWidth: 720 }}>
                <h1 className="mb-3">67176481 ธีรัตม์ ศรีลัดดา ปี 2</h1>
                
                <img src={HumanGif} alt="human" style={{ width: 240, height: 'auto', marginTop: 12, borderRadius: 8 }} />
            </div>
        </div>
    )
}

export default Home;