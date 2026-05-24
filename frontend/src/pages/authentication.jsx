import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Authentication() {

    

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [name, setName] = React.useState();
    const [error, setError] = React.useState();
    const [message, setMessage] = React.useState();


    const [formState, setFormState] = React.useState(0);

    const [open, setOpen] = React.useState(false)
    const [authBackground, setAuthBackground] = React.useState("");


    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    React.useEffect(() => {
        const randomSeed = Date.now();
        const imageCandidates = [
            `https://picsum.photos/1600/1200?random=${randomSeed}`,
            `https://source.unsplash.com/1600x1200/?nature,landscape&sig=${randomSeed}`,
            `https://loremflickr.com/1600/1200/nature?lock=${randomSeed}`
        ];

        let isCancelled = false;

        const tryLoadImage = (index) => {
            if (isCancelled) return;

            if (index >= imageCandidates.length) {
                setAuthBackground("linear-gradient(135deg, #0f172a 0%, #1d4ed8 45%, #22c55e 100%)");
                return;
            }

            const image = new Image();
            image.src = imageCandidates[index];

            image.onload = () => {
                if (!isCancelled) {
                    setAuthBackground(`url(${imageCandidates[index]})`);
                }
            };

            image.onerror = () => {
                tryLoadImage(index + 1);
            };
        };

        tryLoadImage(0);

        return () => {
            isCancelled = true;
        };
    }, []);

    let handleAuth = async () => {
        try {
            if (formState === 0) {

                await handleLogin(username, password)


            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(0)
                setPassword("")
            }
        } catch (err) {

            console.log(err);
            let message = (err.response.data.message);
            setError(message);
        }
    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" className="authPage" sx={{ minHeight: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: authBackground || "linear-gradient(135deg, #0f172a 0%, #1d4ed8 45%, #22c55e 100%)",
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(160deg, rgba(7,17,31,0.28), rgba(7,17,31,0.68))'
                        }
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square className="authCardSurface">
                    <Box
                        sx={{
                            minHeight: '100vh',
                            px: { xs: 3, md: 5 },
                            py: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>


                        <div className="authTabs">
                            <Button variant={formState === 0 ? "contained" : "text"} onClick={() => { setFormState(0) }}>
                                Sign In
                            </Button>
                            <Button variant={formState === 1 ? "contained" : "text"} onClick={() => { setFormState(1) }}>
                                Sign Up
                            </Button>
                        </div>

                        <Box component="form" noValidate className="authFormWrap" sx={{ mt: 2 }}>
                            {formState === 1 ? <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Full Name"
                                name="username"
                                value={name}
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                            /> : <></>}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}
                                autoFocus
                                onChange={(e) => setUsername(e.target.value)}

                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}

                                id="password"
                            />

                            <p className="authError">{error}</p>

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                className="authSubmitButton"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? "Login " : "Register"}
                            </Button>

                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar

                open={open}
                autoHideDuration={4000}
                message={message}
            />

        </ThemeProvider>
    );
}