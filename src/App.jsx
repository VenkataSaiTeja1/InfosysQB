import { useEffect, useState } from 'react';
import QuestionBank from '../InfosysQuestionBank (1).jsx';

const AUTH_USER = 'Student';
const AUTH_PASSWORD = 'student@123';

// IV Year Female Students – 2027 Batch
// Username = Regd.No, Password = Regd.No
const STUDENT_REGNOS = new Set([
  "23FE1A6123","23FE1A6139","23FE1A6160","23FE1A6105","23FE1A6146","23FE1A6133","23FE1A6159",
  "23FE1A6158","23FE1A6117","23FE1A6145","23FE1A6120","23FE1A6112","23FE1A6136","24FE5A6103",
  "23FE1A6149","23FE1A6152","23FE1A6154","23FE1A6122","23FE1A6119","23FE1A6144","24FE5A6101",
  "23FE1A6162","23FE1A6125","23FE1A6151","23FE1A6114","23FE1A6137","23FE1A6143","23FE1A6156",
  "23FE1A4327","23FE1A4360","23FE1A4336","23FE1A4338","23FE1A4357","23FE1A4334","23FE1A4352",
  "23FE1A4311","23FE1A4307","23FE1A4343","23FE1A4361","23FE1A4322","23FE1A4345","23FE1A4312",
  "23FE1A4363","23FE1A4349","24FE5A4302","23FE1A4347","23FE1A4314","23FE1A4342","23FE1A4339",
  "23FE1A4346","23FE1A4332","23FE1A4321","23FE1A4318","23FE1A4302","23FE1A4337","23FE1A4317",
  "23FE1A4308","24FE5A4304","23FE1A4330","23FE1A4304","23FE1A4323","23FE1A4326","23FE1A4320",
  "23FE1A4430","24FE5A4404","23FE1A4406","23FE1A4404","23FE1A4415","23FE1A4462","23FE1A4410",
  "23FE1A4408","23FE1A4402","23FE1A4407","23FE1A4453","23FE1A4418","23FE1A4456","23FE1A4451",
  "23FE1A4422","23FE1A4432","23FE1A4444","23FE1A4441","24FE5A4403","23FE1A4437","23FE1A4416",
  "23FE1A4431","23FE1A0557","23FE1A0502","23FE1A0529","24FE5A0517","23FE1A0501","23FE1A05C2",
  "23FE1A05K4","23FE1A05O1","23FE1A05E6","23FE1A05D6","23FE1A0540","23FE1A05C8","23FE1A05K0",
  "23FE1A05I9","23FE1A05L0","23FE1A05B5","23FE1A05G3","23FE1A0505","23FE1A05F4","23FE1A0528",
  "23FE1A0513","23FE1A0543","23FE1A05H7","23FE1A05N9","24FE5A0519","23FE1A05L5","23FE1A0539",
  "23FE1A05C7","23FE1A05A5","23FE1A05M7","23FE1A0575","23FE1A05B9","23FE1A05F7","23FE1A0515",
  "24FE5A0516","23FE1A0554","23FE1A05J9","23FE1A05C0","23FE1A0578","23FE1A05M4","23FE1A05I2",
  "23FE1A05K1","23FE1A0592","23FE1A0517","23FE1A05N7","23FE1A05H8","23FE1A05F1","23FE1A05H3",
  "24FE5A0523","23FE1A0531","23FE1A05M3","23FE1A05O6","23FE1A05G5","23FE1A05B0","23FE1A05N4",
  "23FE1A0594","23FE1A05E0","23FE1A0506","23FE1A05O5","23FE1A05H2","23FE1A05K7","23FE1A0556",
  "23FE1A05H5","23FE1A0566","23FE1A0522","23FE1A05N6","23FE1A0590","23FE1A05O8","24FE5A0504",
  "23FE1A05J3","24FE5A0521","23FE1A05I3","23FE1A05L9","23FE1A0521","23FE1A0574","23FE1A0507",
  "23FE1A0567","23FE1A0509","23FE1A0580","23FE1A0589","23FE1A0548","23FE1A0573","23FE1A0591",
  "23FE1A0571","23FE1A05O2","23FE1A05F8","23FE1A05K8","23FE1A05D8","23FE1A05J4","23FE1A05L2",
  "23FE1A0547","24FE5A0507","24FE5A0513","23FE1A0596","23FE1A05E4","24FE5A0502","23FE1A0546",
  "24FE5A0511","23FE1A0597","23FE1A0508","23FE1A05N5","23FE1A0541","23FE1A05J8","24FE5A0512",
  "23FE1A05E1","23FE1A0579","23FE1A0527","23FE1A0559","23FE1A0530","23FE1A05D1","23FE1A0570",
  "23FE1A0524","23FE1A05H9","23FE1A05D9","23FE1A05B2","23FE1A0551","23FE1A4211","23FE1A4218",
  "24FE5A4204","23FE1A4214","23FE1A4223","23FE1A4257","23FE1A4250","23FE1A4239","23FE1A4244",
  "23FE1A4210","23FE1A4251","23FE1A4202","23FE1A4255","23FE1A4260","23FE1A4240","23FE1A4216",
  "23FE1A4222","23FE1A4238","23FE1A4231","23FE1A4265","23FE1A4203","23FE1A4236","23FE1A4213",
  "23FE1A4263","23FE1A4206","23FE1A4227","24FE5A4203","23FE1A4237","23FE1A4241","23FE1A4252",
  "23FE1A04I6","23FE1A0412","24FE5A0418","23FE1A0452","23FE1A04A8","23FE1A0480","23FE1A0448",
  "23FE1A0425","23FE1A04G7","23FE1A0481","24FE5A0412","23FE1A0422","24FE5A0405","24FE5A0406",
  "23FE1A0410","23FE1A0465","23FE1A0449","23FE1A04B4","23FE1A04D1","23FE1A04I3","23FE1A0403",
  "23FE1A04A5","23FE1A04F7","23FE1A04B7","23FE1A0404","23FE1A0416","23FE1A0470","23FE1A04A1",
  "23FE1A04I4","23FE1A0479","23FE1A04B0","23FE1A04I2","23FE1A0489","23FE1A04B1","23FE1A0464",
  "23FE1A0434","23FE1A04D8","23FE1A04G1","23FE1A04H6","23FE1A0469","23FE1A0453","23FE1A04C4",
  "23FE1A04E1","23FE1A04D0","23FE1A0436","23FE1A0475","23FE1A0496","23FE1A04D3","23FE1A04C9",
  "23FE1A04I5","23FE1A0413","24FE5A0421","23FE1A0456","23FE1A0451","23FE1A0445","23FE1A0406",
  "23FE1A04E8","23FE1A0450","23FE1A0431","23FE1A0477","23FE1A0493","23FE1A04F1","23FE1A04A2",
  "24FE5A0410","23FE1A0401","23FE1A04C7","23FE1A04H3","24FE5A0402","23FE1A0463","23FE1A0405",
  "23FE1A0455","23FE1A0461","23FE1A04G0","23FE1A04G5","23FE1A0447","23FE1A04E9","23FE1A0474",
  "23FE1A04J3","23FE1A04E2","23FE1A0471","23FE1A0483","23FE1A0438","23FE1A04C8","23FE1A04D2",
  "23FE1A04B6","23FE1A0429","23FE1A04E3","24FE5A0419","23FE1A0212","24FE5A0213","23FE1A0214",
  "23FE1A0272","23FE1A0226","24FE5A0214","23FE1A0240","23FE1A0242","23FE1A0217","23FE1A0246",
  "23FE1A0228","23FE1A0259","23FE1A0256","23FE1A0224","23FE1A0205","23FE1A0248","23FE1A0265",
  "23FE1A0255","23FE1A0262","23FE1A0219","23FE1A0247","23FE1A0239","23FE1A0227","23FE1A0273",
  "23FE1A0223","23FE1A0237","23FE1A0266","23FE1A0260","23FE1A0222","23FE1A0261","23FE1A0207",
  "23FE1A0264","23FE1A1252","23FE1A1241","23FE1A1204","24FE5A1202","23FE1A1242","23FE1A1208",
  "23FE1A1219","23FE1A1248","23FE1A1243","23FE1A1251","23FE1A1212","23FE1A1239","23FE1A1218",
  "23FE1A1237","23FE1A1244","23FE1A1254","23FE1A1247","23FE1A1216","23FE1A1227","23FE1A1246",
  "23FE1A1258","23FE1A1222","23FE1A1221","23FE1A1213","23FE1A1262","23FE1A1203","23FE1A1223",
  "23FE1A1245","24FE5A1203","23FE1A1220","23FE1A1228","23FE1A1207","23FE1A0304","23FE1A0312",
  "25FE1F0006","25FE1F0013","25FE1F0019","25FE1F0022","25FE1F0023","25FE1F0024","25FE1F0026",
  "25FE1F0030","25FE1F0031","25FE1F0032","25FE1F0033","25FE1F0037","25FE1F0043","25FE1F0045",
  "25FE1F0046","25FE1F0047","25FE1F0049","25FE1F0051","25FE1F0053","25FE1F0055","25FE1F0056",
  "25FE1F0057","25FE1F0058","25FE1F0059","25FE1F0062","25FE1F0063","25FE1F0066","25FE1F0069",
  "25FE1F0070","25FE1F0075","25FE1F0077","25FE1F0081",
]);

function LoginScreen({ onLogin, error }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top,_#21406f_0%,_#0f172a_38%,_#07111f_100%)] px-6 py-10 text-white">
			<div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
				<div className="grid w-full gap-6 lg:grid-cols-[1.1fr_0.9fr]">
					<div className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/8 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#d9c38b]">
								Infosys Question Bank
							</p>
							<h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight md:text-6xl">
								Placement practice with a clean, focused login gate.
							</h1>
							<p className="mt-4 max-w-xl text-sm leading-6 text-slate-200/90 md:text-base">
								Access the full question bank after a single authenticated sign-in. The credentials are handled in code and never shown on screen.
							</p>
						</div>

						<div className="mt-10 grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
							{[
								'Section-wise practice',
								'Timed preparation view',
								'Readable study interface',
							].map((item) => (
								<div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
									{item}
								</div>
							))}
						</div>
					</div>

					<div className="flex items-center justify-center rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
						<form
							onSubmit={(e) => {
								e.preventDefault();
								onLogin(username, password);
							}}
							className="w-full max-w-md rounded-[1.75rem] border border-white/10 bg-white/95 p-8 text-slate-900 shadow-xl"
						>
							<div className="mb-8">
								<p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#21406f]">
									Secure Entry
								</p>
								<h2 className="mt-3 text-3xl font-semibold text-slate-950">
									Sign in to continue
								</h2>
								<p className="mt-2 text-sm leading-6 text-slate-600">
									Use your assigned account to unlock the practice dashboard.
								</p>
							</div>

							<label className="block">
								<span className="mb-2 block text-sm font-medium text-slate-700">Username</span>
								<input
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									autoComplete="username"
									placeholder="Enter username"
									className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#21406f] focus:ring-4 focus:ring-[#21406f]/10"
								/>
							</label>

							<label className="mt-4 block">
								<span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
								<input
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									autoComplete="current-password"
									placeholder="Enter password"
									className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#21406f] focus:ring-4 focus:ring-[#21406f]/10"
								/>
							</label>

							{error && (
								<div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
									{error}
								</div>
							)}

							<button
								type="submit"
								className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[#21406f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#18355c]"
							>
								Enter dashboard
							</button>

							<p className="mt-4 text-center text-xs leading-5 text-slate-500">
								This page appears once before the main React experience.
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loginError, setLoginError] = useState('');

	useEffect(() => {
		document.body.style.background = '#07111f';
	}, []);

	const handleLogin = (username, password) => {
		const normalizedUser = username.trim().toUpperCase();
		const normalizedPassword = password.trim();

		// Admin credential
		if (username.trim() === AUTH_USER && password === AUTH_PASSWORD) {
			setLoginError('');
			setIsAuthenticated(true);
			return;
		}

		// Student credential: Regd.No as both username and password
		if (STUDENT_REGNOS.has(normalizedUser) && normalizedPassword === normalizedUser) {
			setLoginError('');
			setIsAuthenticated(true);
			return;
		}

		setLoginError('Invalid username or password.');
	};

	const handleLogout = () => {
		setIsAuthenticated(false);
		setLoginError('');
	};

	if (!isAuthenticated) {
		return <LoginScreen onLogin={handleLogin} error={loginError} />;
	}

	return <QuestionBank onLogout={handleLogout} />;
}
