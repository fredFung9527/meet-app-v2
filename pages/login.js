import React from 'react'
import { useRouter } from 'next/router'
import { keys, some } from 'lodash'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { checkEmailFormat } from '/helpers'

import Head from 'next/head'
import { Grid, Typography } from '@material-ui/core'
import Image from 'next/image'
import TextInput from '/components/TextInput'
import PasswordInput from '/components/PasswordInput'
import BoxButton from '/components/BoxButton'
import CheckBox from '/components/CheckBox'
import Loading from '/components/Loading'
import Alert from '/components/Alert'
import LanguageSwitch from '/components/LanguageSwitch'

import { useSelector, useDispatch } from 'react-redux'
import { setRememberMe, setUser } from '/store/userSlice'
import { setUser as setUserSession } from '/store/userSessionSlice'
import { alertError, alertSuccess, setLoading } from '/store/commonSlice'
import logo from '/public/images/logo.svg'

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user)
  const { t } = useTranslation('login')

  const [firstTrial, setFirstTrial] = React.useState(true)
  const [userInput, setUserInput] = React.useState({
    email: '',
    password: ''
  })
  const [helperTexts, setHelperTexts] = React.useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = React.useState({
    email: false,
    password: false
  })

  const checkInput = (target) => {
    const checkList = target ? [target] : keys(userInput)
    let newHelperTexts = {}
    let newErrors = {}
    for (let key of checkList) {
      switch (key) {
        case 'email':
          if (!userInput.email) {
            newErrors.email = true
            newHelperTexts.email = t('needEmail')
          } else {
            if (!checkEmailFormat(userInput.email)) {
              newErrors.email = true
              newHelperTexts.email = t('wrongEmail')
            } else {
              newErrors.email = false
              newHelperTexts.email = ''
            }
          }
          break
        default:
          if (!userInput.password) {
            newErrors.password = true
            newHelperTexts.password = t('needPassword')
          } else {
            newErrors.password = false
            newHelperTexts.password = ''
          }
      }
    }
    const combinedErrors = {...errors, ...newErrors}
    setErrors(combinedErrors)
    setHelperTexts({...helperTexts, ...newHelperTexts})
    return !some(combinedErrors, (value, key) => value)
  }

  React.useEffect(() => {
    dispatch(setUser({}))
    dispatch(setUserSession({}))
    if (router.query.from) {
      dispatch(alertError(t('loginFirst')))
    }
  }, [])

  React.useEffect(() => {
    if (firstTrial) return
    checkInput('email')
  }, [userInput.email])

  React.useEffect(() => {
    if (firstTrial) return
    checkInput('password')
  }, [userInput.password])
  
  const handleUserInput = (event) => {
    setUserInput({...userInput, [event.target.name]: event.target.value})
  }

  const handleLogin = async () => {
    setFirstTrial(false)
    if (!checkInput()) return
    try {
      dispatch(setLoading(true))
      if (userInput.email !== 'aa@aa.com' || userInput.password !== 'aaaaaaaa') {
        throw new Error('Invalid login')
      }
      const user = {
        email: 'aa@aa.com',
        firstName: 'Fred',
        lastName: 'Fung',
        title: 'programmer'
      }
      if (userState.rememberMe) {
        dispatch(setUser(user))
      } else {
        dispatch(setUserSession(user))
      }
      router.replace(router.query.from || '/')
      dispatch(alertSuccess(t('welcomeBack')))
    } catch (e) {
      dispatch(alertError(t('wrongEmailOrPassword')))
    } finally {
      setTimeout(() => { dispatch(setLoading(false)) }, 500)
    }
  }
  
  return (
    <div style={{height: '100vh'}}>
      <Head>
        <title>{t('login')} - MeetApp</title>
      </Head>

      <Alert/>
      <Loading/>

      <Grid container className="full-height">
        <Grid 
          item container xs={12} md={6}
          style={{backgroundImage: `url("/images/background.jpg")`, backgroundSize: 'cover'}} 
          justifyContent="center" alignItems="center"
        >
          <Image src={logo} width={200} height={200}/>
        </Grid>
        <Grid 
          item container direction="column" xs={12} md={6} 
          justifyContent="center" alignItems="center"
        >
          <div style={{maxWidth: 300}}>
            <Typography variant="h6" className="my-1">{t('loginToYourAccount')}</Typography>
            <TextInput
              required
              name="email"
              error={errors.email}
              helperText={helperTexts.email}
              onChange={handleUserInput}
              label={t('email')}
            />
            <PasswordInput
              required
              name="password"
              error={errors.password}
              helperText={helperTexts.password}
              onChange={handleUserInput}
            />
            <CheckBox
              checked={userState.rememberMe}
              label={t('rememberMe')}
              onChange={(event) => dispatch(setRememberMe(event.target.checked))}
              className="mb-1"
            />
            <BoxButton 
              className="full-width"
              onClick={handleLogin}
            >
              {t('login')}
            </BoxButton>
            <Grid item container justifyContent="flex-end" className="my-1">
              <LanguageSwitch/>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['login']),
  },
})