import { useEffect, useMemo, useState } from 'react';
import QuestionBank from '../InfosysQuestionBank (1).jsx';

const AUTH_USER = 'Student';
const AUTH_PASSWORD = 'student@123';
const AUTH_KEY = 'infosys-question-bank-authenticated';

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
	const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem(AUTH_KEY) === 'true');
	const [loginError, setLoginError] = useState('');

	useEffect(() => {
		document.body.style.background = '#07111f';
	}, []);

	const handleLogin = useMemo(
		() => (username, password) => {
			const normalizedUser = username.trim();
			const normalizedPassword = password;

			if (normalizedUser === AUTH_USER && normalizedPassword === AUTH_PASSWORD) {
				sessionStorage.setItem(AUTH_KEY, 'true');
				setLoginError('');
				setIsAuthenticated(true);
				return;
			}

			setLoginError('Invalid username or password.');
		},
		[]
	);

	if (!isAuthenticated) {
		return <LoginScreen onLogin={handleLogin} error={loginError} />;
	}

	return <QuestionBank />;
}
