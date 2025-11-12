
import { useState } from 'react'

const Temperatures = () => {
	// central state: keep Celsius as source of truth
	const [celsius, setCelsius] = useState(25.0)

	// conversion helpers
	const cToF = (c) => (c * 9) / 5 + 32
	const cToK = (c) => c + 273.15
	const fToC = (f) => ((f - 32) * 5) / 9
	const kToC = (k) => k - 273.15

	const fahrenheit = cToF(celsius)
	const kelvin = cToK(celsius)

	// handlers that update the Celsius state based on which unit was changed
	const incC = () => setCelsius((c) => +(c + 1).toFixed(2))
	const decC = () => setCelsius((c) => +(c - 1).toFixed(2))

	const incF = () => {
		setCelsius((c) => {
			const newF = +(cToF(c) + 1).toFixed(2)
			return +fToC(newF).toFixed(2)
		})
	}
	const decF = () => {
		setCelsius((c) => {
			const newF = +(cToF(c) - 1).toFixed(2)
			return +fToC(newF).toFixed(2)
		})
	}

	const incK = () => {
		setCelsius((c) => {
			const newK = +(cToK(c) + 1).toFixed(2)
			return +kToC(newK).toFixed(2)
		})
	}
	const decK = () => {
		setCelsius((c) => {
			const newK = +(cToK(c) - 1).toFixed(2)
			return +kToC(newK).toFixed(2)
		})
	}

	return (
		<div className="border border-black border-2 rounded-3 mx-auto mt-3 p-3" style={{ width: '800px', background: '#fff' }}>
			<h1 className="text-center text-primary">TEMPERATURES</h1>
			<div className="d-flex justify-content-center gap-3 mb-3">
				<span className="badge bg-primary fs-6">{celsius.toFixed(2)} &deg;C</span>
				<span className="badge bg-primary fs-6">{fahrenheit.toFixed(2)} &deg;F</span>
				<span className="badge bg-primary fs-6">{kelvin.toFixed(2)} K</span>
			</div>
			<div className="row text-center">
				<div className="col d-flex justify-content-center">
					<div className="border border-black border-2 m-auto rounded-3 p-2 bg-secondary-subtle text-center mt-3" style={{width: 'fit-content'}}>
						<h1 className='text-primary'>CELSIUS</h1>
						<div className="d-flex justify-content-between align-items-center gap-2">
							<button className='btn btn-danger btn-lg' onClick={decC}>&minus;</button>
							<div className="fs-3 fw-bold">{celsius.toFixed(2)}</div>
							<button className='btn btn-success btn-lg' onClick={incC}>+</button>
						</div>
					</div>
				</div>
				<div className="col d-flex justify-content-center">
					<div className="border border-black border-2 m-auto rounded-3 p-2 bg-secondary-subtle text-center mt-3" style={{width: 'fit-content'}}>
						<h1 className='text-primary'>FAHRENHEIT</h1>
						<div className="d-flex justify-content-between align-items-center gap-2">
							<button className='btn btn-danger btn-lg' onClick={decF}>&minus;</button>
							<div className="fs-3 fw-bold">{fahrenheit.toFixed(2)}</div>
							<button className='btn btn-success btn-lg' onClick={incF}>+</button>
						</div>
					</div>
				</div>
				<div className="col d-flex justify-content-center">
					<div className="border border-black border-2 m-auto rounded-3 p-2 bg-secondary-subtle text-center mt-3" style={{width: 'fit-content'}}>
						<h1 className='text-primary'>KELVIN</h1>
						<div className="d-flex justify-content-between align-items-center gap-2">
							<button className='btn btn-danger btn-lg' onClick={decK}>&minus;</button>
							<div className="fs-3 fw-bold">{kelvin.toFixed(2)}</div>
							<button className='btn btn-success btn-lg' onClick={incK}>+</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Temperatures
