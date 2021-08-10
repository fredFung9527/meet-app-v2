import store from '/store'
import Router from 'next/router'
import { enUS, zhTW, zhCN } from 'date-fns/locale'
import { format, addMinutes, parseISO, formatDistance } from 'date-fns'
import { getTimezoneOffset, zonedTimeToUtc } from 'date-fns-tz'
import { lastIndexOf } from 'lodash'

export function getTimeLocale() {
	const locale = Router.router.locale
	switch (locale) {
    case 'zh-TW':
      return zhTW
    case 'zh-CN':
      return zhCN
    default:
      return enUS
  }
}

export function getTimeLocaleString() {
	const locale = Router.router.locale
	return locale === 'en' ? 'en-US' : locale
}

export function getFromNow(value) {
	return formatDistance(value, new Date(), { addSuffix: true, locale: getTimeLocale()})
}

export function getLocalTimezoneOffset() {
	try {
		const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
		return getTimezoneOffset(localTimezone) / 1000 / 60 // in minutes
	} catch (e) {
		return -new Date().getTimezoneOffset()
	}
}

export function dateFromUTC(value) {
	if (!value || value == 'Invalid Date') return
	const date = typeof value ==='string' ? parseISO(value) : value
	const settings = store.getState().settings
	if (settings.useLocalTimezone || !settings.timezone) return date

	const localOffset = getLocalTimezoneOffset()
	const selectedOffset = getTimezoneOffset(settings.timezone) / 1000 / 60 // in minutes
	return addMinutes(date, selectedOffset - localOffset)
}

export function dateToDB(value) {
	const date = typeof value ==='string' ? parseISO(value) : value
	const settings = store.getState().settings
	if (settings.useLocalTimezone || !settings.timezone) return date

	const dateString = formatDate(date, 'yyyy-MM-dd HH:mm:ss', true)
	return zonedTimeToUtc(dateString, settings.timezone)
}

export function formatDate(value, formatString='yyyy-MM-dd', noLocale) { // use default local timezone
	if (!value || value == 'Invalid Date') return
	const date = typeof value ==='string' ? parseISO(value) : value
	return format(date, formatString, { locale: noLocale ? null : getTimeLocale()})
}

export function formatDateTZ(value, formatString='yyyy-MM-dd', noLocale) { // use selected timezone
	if (!value || value == 'Invalid Date') return
	const transfromedDate = dateFromUTC(value)
	return formatDate(transfromedDate, formatString, noLocale)
}

export function checkEmailFormat(v) {
	const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(v)
}

export function capitalizeFirstLetter(string) {
	if (!string) return ''
	return string.charAt(0).toUpperCase() + string.slice(1)
}

export function getYearOptions() {
	let currentYear = new Date().getFullYear()
  let options = []
  while (currentYear > 2019) {
    options.push(String(currentYear))
    currentYear -= 1
  }
	return options
}

export function lightenTheColor(colorString, weight=0.2) {
	let color = colorString
	if (!color) return 'blue'
	if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)){
		let c = color.substring(1).split('')
		if(c.length === 3){
			c= [c[0], c[0], c[1], c[1], c[2], c[2]]
		}
		c = '0x'+ c.join('')
		color = 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+', 1)'
	}
	if (color.startsWith('rgba(')) {
		const idx = lastIndexOf(color, ',')
		return color.substring(0, idx+1) + `${weight})`
	}
	return 'blue'
}