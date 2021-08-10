import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { alertError } from '/store/commonSlice'

import { Button } from '@material-ui/core'

export default function FilePicker(props) {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()

  const handleSelected = (files) =>{
    if (!files.length) return
    const sizeLimit = props.sizeLimit || 10 * 1024 * 1024
    for (let file of files) {
      if (file.size > sizeLimit) {
        dispatch(alertError(t('fileTooLarge')))
        return
      }
    }
    props.onChange && props.onChange(files)
  }

  return (
    <Button component="label" className={props.hidden ? 'hidden' : ''}>
      {t('uploadFile')}
      <input
        type="file"
        hidden
        onChange={(e) => handleSelected(e.target.files)}
        multiple={props.multiple}
        accept={props.accept || 'image/*'}
        ref={props.innerRef}
      />
    </Button>
  )
}