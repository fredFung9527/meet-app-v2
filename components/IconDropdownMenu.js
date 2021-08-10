import React from 'react'
import { Menu, IconButton } from '@material-ui/core'
import MyMenuItem from '/components/MyMenuItem'
import Link from 'next/link'

export default function IconDropdownMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton color="primary" onClick={handleClick}>
        {props.icon}
      </IconButton>
      <Menu
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
          props.items && props.items.map((item) => (
            <div key={item.to}>
              <MyMenuItem>
                <Link href={item.to}>
                  <a>{item.text}</a>
                </Link>
              </MyMenuItem>
            </div>
          ))
        }
      </Menu>
    </>
  )
}