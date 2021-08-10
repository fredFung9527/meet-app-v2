import showcase from '/public/images/icons/showcase.png'
import onlineMeeting from '/public/images/icons/online-meeting.png'
import travel from '/public/images/icons/travel.png'
import jobInterview from '/public/images/icons/job-interview.png'

// colors need to be kept in rgba format
export const meetingStatuseColors = {
	'pending': {
    color: 'white',
    backgroundColor: 'rgba(51, 191, 255, 1)'
  },
	'approved': {
    color: 'white',
    backgroundColor: 'rgba(131, 75, 255, 1)'
  },
  'finish': {
    color: 'white',
    backgroundColor: 'rgba(162, 207, 110, 1)'
  },
  'no-show': {
    color: 'white',
    backgroundColor: 'rgba(255, 206, 86, 1)'
  },
	'no-note': {
    color: 'white',
    backgroundColor: 'rgba(255, 99, 132, 1)'
  }
}

export const meetingTypes = [
  {
    id: 'showcase-or',
    icon: showcase
  },
  {
    id: 'showcase-virtual',
    icon: jobInterview
  },
  {
    id: 'customerVisit',
    icon: travel
  },
  {
    id: 'internal',
    icon: onlineMeeting
  },
  {
    id: 'other',
  },
]

// must be sorted in descending order by startMonth
export const showcaseSeasons = [
  {
    id: 'Summer',
    startMonth: 6,
  },
  {
    id: 'Winter',
    startMonth: 1,
  }
]

// will be removed after connect to API
export const internalParticipants = [
	{
		"userID": "alfred.chan",
		"e_name": "Alfred Chan",
		"t_name": "Alfred Chan",
		"s_name": "Alfred Chan",
		"email": "alfred.chan@utxgroup.com"
	},
	{
		"userID": "alvs.kwong",
		"e_name": "Alvs Kwong",
		"t_name": "Alvs Kwong",
		"s_name": "Alvs Kwong",
		"email": "alvs.kwong@utxgroup.com"
	},
	{
		"userID": "andy.leung",
		"e_name": "Andy Leung",
		"t_name": "Andy Leung",
		"s_name": "Andy Leung",
		"email": "andy.leung@utxgroup.com"
	},
	{
		"userID": "andy.wong",
		"e_name": "Andy Wong",
		"t_name": "黃鷹君",
		"s_name": "黄鹰君",
		"email": "andy.wong@utxgroup.com"
	},
	{
		"userID": "angel.chan",
		"e_name": "Angel Chan",
		"t_name": "Angel Chan",
		"s_name": "Angel Chan",
		"email": "angel.chan@utxgroup.com"
	},
	{
		"userID": "annie.yeung",
		"e_name": "Annie Yeung",
		"t_name": "Annie Yeung",
		"s_name": "Annie Yeung",
		"email": "annie.yeung@utxgroup.com"
	},
	{
		"userID": "astor.lin",
		"e_name": "Astor Lin",
		"t_name": "Astor Lin",
		"s_name": "Astor Lin",
		"email": "astor.lin@utxgroup.com"
	},
	{
		"userID": "ben.fung",
		"e_name": "Ben Fung",
		"t_name": "Ben Fung",
		"s_name": "Ben Fung",
		"email": "ben.fung@utxgroup.com"
	},
	{
		"userID": "benny.tam",
		"e_name": "Benny Tam",
		"t_name": "Benny Tam",
		"s_name": "Benny Tam",
		"email": "benny.tam@utxgroup.com"
	},
	{
		"userID": "beth.he",
		"e_name": "Beth He",
		"t_name": "何香",
		"s_name": "何香",
		"email": "beth.he@utxgroup.com"
	},
	{
		"userID": "carol.ching",
		"e_name": "Carol Ching",
		"t_name": "Carol Ching",
		"s_name": "Carol Ching",
		"email": "carol.ching@utxgroup.com"
	},
	{
		"userID": "cat.chan",
		"e_name": "Cat Chan",
		"t_name": "Cat Chan",
		"s_name": "Cat Chan",
		"email": "cat.chan@utxgroup.com"
	},
	{
		"userID": "chris.smith",
		"e_name": "Chris Smith",
		"t_name": "Chris Smith",
		"s_name": "Chris Smith",
		"email": "csmith.duraflex@gmail.com"
	},
	{
		"userID": "cora.cheng",
		"e_name": "Cora Cheng",
		"t_name": "Cora Cheng",
		"s_name": "Cora Cheng",
		"email": "cora.cheng@utxgroup.com"
	},
	{
		"userID": "daniel.zhang",
		"e_name": "Daniel Zhang",
		"t_name": "Daniel Zhang",
		"s_name": "Daniel Zhang",
		"email": "daniel.zhang@utxgroup.com"
	},
	{
		"userID": "david.leung",
		"e_name": "David Leung",
		"t_name": "David Leung",
		"s_name": "David Leung",
		"email": "david.leung@utxgroup.com"
	},
	{
		"userID": "dennis.chan",
		"e_name": "Dennis Chan",
		"t_name": "Dennis Chan",
		"s_name": "Dennis Chan",
		"email": "dennis.chan@utxgroup.com"
	},
	{
		"userID": "dino.li",
		"e_name": "Dino Li",
		"t_name": "Dino Li",
		"s_name": "Dino Li",
		"email": "dino.li@utxgroup.com"
	},
	{
		"userID": "earnest.lee",
		"e_name": "Earnest Lee",
		"t_name": "Earnest Lee",
		"s_name": "Earnest Lee",
		"email": "earnest.lee@utxgroup.com"
	},
	{
		"userID": "eddman.huang",
		"e_name": "Eddman Huang",
		"t_name": "Eddman Huang",
		"s_name": "Eddman Huang",
		"email": "eddman.huang@utxgroup.com"
	},
	{
		"userID": "edmund.cheung",
		"e_name": "Edmund Cheung",
		"t_name": "Edmund Cheung",
		"s_name": "Edmund Cheung",
		"email": "edmund.cheung@utxgroup.com"
	},
	{
		"userID": "erik.hauge",
		"e_name": "Erik Hauge",
		"t_name": "Erik Hauge",
		"s_name": "Erik Hauge",
		"email": "ehauge.duraflex@gmail.com"
	},
	{
		"userID": "fantine.chang",
		"e_name": "Fantine Chang",
		"t_name": "Fantine Chang",
		"s_name": "Fantine Chang",
		"email": null
	},
	{
		"userID": "fred.fung",
		"e_name": "Fred Fung",
		"t_name": "Fred Fung",
		"s_name": "Fred Fung",
		"email": "fred.fung@utxgroup.com"
	},
	{
		"userID": "gary.fraze",
		"e_name": "Gary Fraze",
		"t_name": "Gary Fraze",
		"s_name": "Gary Fraze",
		"email": "gfraze.duraflex@gmail.com"
	},
	{
		"userID": "glen.gmail",
		"e_name": "Glen (GMAIL)",
		"t_name": "Glen (GMAIL)",
		"s_name": "Glen (GMAIL)",
		"email": "glen.wong@utxgroup.com"
	},
	{
		"userID": "glen.wong",
		"e_name": "Glen Wong",
		"t_name": "黃志良",
		"s_name": "黃志良",
		"email": "glen.wong@utxgroup.com"
	},
	{
		"userID": "gustav.tam",
		"e_name": "Gustav Tam",
		"t_name": "Gustav Tam",
		"s_name": "Gustav Tam",
		"email": "gustav.tam@utxgroup.com"
	},
	{
		"userID": "jim.chen",
		"e_name": "Jim Chen",
		"t_name": "Jim Chen",
		"s_name": "Jim Chen",
		"email": null
	},
	{
		"userID": "jochen.schulz",
		"e_name": "Jochen Schulz",
		"t_name": "Jochen Schulz",
		"s_name": "Jochen Schulz",
		"email": "jochen.schulz@duraflexgroup.com"
	},
	{
		"userID": "joe.yang",
		"e_name": "Joe Yang",
		"t_name": "Joe Yang",
		"s_name": "Joe Yang",
		"email": "joe.yang@utxgroup.com"
	},
	{
		"userID": "julio.wong",
		"e_name": "Julio Wong",
		"t_name": "Julio Wong",
		"s_name": "Julio Wong",
		"email": "julio.wong@utxgroup.com"
	},
	{
		"userID": "keith.wong",
		"e_name": "Keith Wong",
		"t_name": "Keith Wong",
		"s_name": "Keith Wong",
		"email": "keith.wong@utxgroup.com"
	},
	{
		"userID": "kevin.chan",
		"e_name": "Kevin Chan",
		"t_name": "Kevin Chan",
		"s_name": "Kevin Chan",
		"email": "kevin.chan@utxgroup.com"
	},
	{
		"userID": "kimi.liu",
		"e_name": "Kimi Liu",
		"t_name": "Kimi Liu",
		"s_name": "Kimi Liu",
		"email": "kimi.liu@utxgroup.com"
	},
	{
		"userID": "larry.choi",
		"e_name": "Larry Choi",
		"t_name": "Larry Choi",
		"s_name": "Larry Choi",
		"email": "larry.choi@utxgroup.com"
	},
	{
		"userID": "leo.wang",
		"e_name": "Leo Wang",
		"t_name": "Leo Wang",
		"s_name": "Leo Wang",
		"email": "leo.wang@utxgroup.com"
	},
	{
		"userID": "madelyn.kiss",
		"e_name": "Madelyn Kiss",
		"t_name": "Madelyn Kiss",
		"s_name": "Madelyn Kiss",
		"email": "mkiss.duraflex@gmail.com"
	},
	{
		"userID": "mary.smith",
		"e_name": "Mary Smith",
		"t_name": "Mary Smith",
		"s_name": "Mary Smith",
		"email": "msmith.duraflex@gmail.com"
	}
]

// will be removed after connect to API
export const marketCodes = [
	{
		"_id": "60861ed156a3f8aebcb4392e",
		"marketCode": "11PI01",
		"e_name": "11pine",
		"t_name": "11pine",
		"s_name": "11pine",
		"j_name": "11pine",
		"brandCode": "11PI",
		"area": "RBXX",
		"managers": [
			"michelle.mavis"
		],
		"developers": [],
		"assistants": [],
		"advisors": []
	},
	{
		"_id": "60861ed156a3f8aebcb4392f",
		"marketCode": "1OSA01",
		"e_name": "One Source Apparel",
		"t_name": "One Source Apparel",
		"s_name": "One Source Apparel",
		"j_name": "One Source Apparel",
		"brandCode": "1OSA",
		"area": "RBXX",
		"managers": [
			"chris.smith"
		],
		"developers": [],
		"assistants": [],
		"advisors": []
	},
	{
		"_id": "60861ed156a3f8aebcb43930",
		"marketCode": "2ASP02",
		"e_name": "2A S.p.A.",
		"t_name": "2A S.p.A.",
		"s_name": "2A S.p.A.",
		"j_name": "2A S.p.A.",
		"brandCode": "2ASP",
		"area": "RBOE",
		"managers": [
			"sylvano.stoppani"
		],
		"developers": [
			"ben.fung"
		],
		"assistants": [],
		"advisors": [
			"mike.ho"
		]
	},
	{
		"_id": "60861ed156a3f8aebcb43931",
		"marketCode": "2ASP99",
		"e_name": "2A S.p.A.",
		"t_name": "2A S.p.A.",
		"s_name": "2A S.p.A.",
		"j_name": "2A S.p.A.",
		"brandCode": "2ASP",
		"area": "RBOE",
		"managers": [
			"sylvano.stoppani"
		],
		"developers": [
			"ben.fung"
		],
		"assistants": [],
		"advisors": [
			"mike.ho"
		]
	},
	{
		"_id": "60861ed156a3f8aebcb43932",
		"marketCode": "3FXX99",
		"e_name": "3F-厦门三峰应兵户外用品有限公司",
		"t_name": "3F-厦门三峰应兵户外用品有限公司",
		"s_name": "3F-厦门三峰应兵户外用品有限公司",
		"j_name": "3F-厦门三峰应兵户外用品有限公司",
		"brandCode": "3FXX",
		"area": "SLT",
		"managers": [],
		"developers": [],
		"assistants": [],
		"advisors": []
	},
	{
		"_id": "60861ed156a3f8aebcb43933",
		"marketCode": "4FXX99",
		"e_name": "4F-天津欧利弗莱国际贸易有限公司",
		"t_name": "4F-天津欧利弗莱国际贸易有限公司",
		"s_name": "4F-天津欧利弗莱国际贸易有限公司",
		"j_name": "4F-天津欧利弗莱国际贸易有限公司",
		"brandCode": "4FXX",
		"area": "SLT",
		"managers": [],
		"developers": [],
		"assistants": [],
		"advisors": []
	},
	{
		"_id": "60861ed156a3f8aebcb43934",
		"marketCode": "4MOM03",
		"e_name": "4moms",
		"t_name": "4moms",
		"s_name": "4moms",
		"j_name": "4moms",
		"brandCode": "4MOM",
		"area": "RBCX",
		"managers": [
			"chris.smith"
		],
		"developers": [
			"daniel.zhang"
		],
		"assistants": [],
		"advisors": []
	},
	{
		"_id": "60861ed156a3f8aebcb43935",
		"marketCode": "4MSY07",
		"e_name": "4M SYSTEMS a.s.",
		"t_name": "4M SYSTEMS a.s.",
		"s_name": "4M SYSTEMS a.s.",
		"j_name": "4M SYSTEMS a.s.",
		"brandCode": "4MSY",
		"area": "RBTX",
		"managers": [
			"sebastian.müller"
		],
		"developers": [
			"edmund.cheung"
		],
		"assistants": [],
		"advisors": [
			"mike.ho"
		]
	},
	{
		"_id": "60861ed156a3f8aebcb43936",
		"marketCode": "511T01",
		"e_name": 5.11,
		"t_name": 5.11,
		"s_name": 5.11,
		"j_name": 5.11,
		"brandCode": "511T",
		"area": "RBTX",
		"managers": [
			"madelyn.kiss"
		],
		"developers": [
			"ben.fung"
		],
		"assistants": [],
		"advisors": [
			"mike.ho"
		]
	},
	{
		"_id": "60861ed156a3f8aebcb43937",
		"marketCode": "511T02",
		"e_name": 5.11,
		"t_name": 5.11,
		"s_name": 5.11,
		"j_name": 5.11,
		"brandCode": "511T",
		"area": "RBTX",
		"managers": [
			"madelyn.kiss"
		],
		"developers": [
			"ben.fung"
		],
		"assistants": [],
		"advisors": [
			"mike.ho"
		]
	},
	{
		"_id": "60861ed156a3f8aebcb43938",
		"marketCode": "511T07",
		"e_name": 5.11,
		"t_name": 5.11,
		"s_name": 5.11,
		"j_name": 5.11,
		"brandCode": "511T",
		"area": "RBTX",
		"managers": [
			"madelyn.kiss"
		],
		"developers": [
			"ben.fung"
		],
		"assistants": [],
		"advisors": [
			"mike.ho"
		]
	},
	{
		"_id": "60861ed156a3f8aebcb43939",
		"marketCode": "686T01",
		"e_name": "686 Technical Apparel",
		"t_name": "686 Technical Apparel",
		"s_name": "686 Technical Apparel",
		"j_name": "686 Technical Apparel",
		"brandCode": "686T",
		"area": "RBOA",
		"managers": [
			"madelyn.kiss"
		],
		"developers": [
			"ting.chu"
		],
		"assistants": [],
		"advisors": [
			"theresa.zhong"
		]
	},
	{
		"_id": "60861ed156a3f8aebcb4393a",
		"marketCode": "90PO02",
		"e_name": "90 points-90分",
		"t_name": "90 points-90分",
		"s_name": "90 points-90分",
		"j_name": "90 points-90分",
		"brandCode": "90PO",
		"area": "SLT",
		"managers": [],
		"developers": [],
		"assistants": [],
		"advisors": []
	},
	{
		"_id": "60861ed156a3f8aebcb4393b",
		"marketCode": "90PO99",
		"e_name": "90 points-90分",
		"t_name": "90 points-90分",
		"s_name": "90 points-90分",
		"j_name": "90 points-90分",
		"brandCode": "90PO",
		"area": "SLT",
		"managers": [],
		"developers": [],
		"assistants": [],
		"advisors": []
	},
	{
		"_id": "60861ed156a3f8aebcb4393c",
		"marketCode": "AARN01",
		"e_name": "Aarn Design Ltd.",
		"t_name": "Aarn Design Ltd.",
		"s_name": "Aarn Design Ltd.",
		"j_name": "Aarn Design Ltd.",
		"brandCode": "AARN",
		"area": "RBXX",
		"managers": [
			"may.wong"
		],
		"developers": [],
		"assistants": [],
		"advisors": []
	},
]