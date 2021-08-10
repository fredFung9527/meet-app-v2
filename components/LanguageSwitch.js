import React from 'react'
import { Menu, IconButton } from '@material-ui/core'
import MyMenuItem from './MyMenuItem'
import { useRouter } from 'next/router'
import TranslateIcon from '@material-ui/icons/Translate'
import Link from 'next/link'

export default function LanguageSwitch(props) {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const langShowName = {
    'en': 'English',
    'zh-TW': '繁體中文',
    'zh-CN': '简体中文'
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <TranslateIcon/>
      </IconButton>
      <Menu
        id="language-menu"
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          router.locales.map((lang) => (
            <div key={lang}>
              <MyMenuItem selected={lang === router.locale}>
                <Link href={router.pathname} locale={lang}>
                  <a>{langShowName[lang] || lang}</a>
                </Link>
              </MyMenuItem>
            </div>
          ))
        }
      </Menu>
    </>
  )
}