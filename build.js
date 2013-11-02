var fs = require('fs'),
	path = require('path'),
	read = fs.readFileSync,
	write = fs.writeFileSync;

var args = ["广东省", "北京市", "天津市", "上海市", "重庆市",
	"浙江省", "江苏省", "福建省", "湖南省", "四川省",
	"河南省", "湖北省", "河北省", "山西省",
	"辽宁省", "吉林省", "黑龙江省",
	"安徽省", "江西省", "山东省",
	"陕西省", "甘肃省", "青海省",
	"海南省", "云南省", "贵州省",
	"广西壮族自治区", "宁夏回族自治区", "内蒙古自治区", "新疆维吾尔自治区",
	"西藏自治区"
];

var sort_index = {};

JSON.parse(read(path.join(__dirname, './json/index.json'))).forEach(function(province) {
	sort_index[province.n] = province.i;
});

var r1 = [],
	r2 = [],
	r3 = [];

args.forEach(function(name) {
	r1.push(name);
	var cityArray = [];
	var da = [];
	JSON.parse(read(path.join(__dirname, 'json', sort_index[name] + '.json'))).forEach(function(city) {
		cityArray.push(city.n);
		var distArray = [];
		if (city.c) {
			city.c.forEach(function(dist) {
				distArray.push(dist.n);
			});
		}
		da.push(distArray);
	});
	r2.push(cityArray);
	r3.push(da);
});

write(path.join(__dirname, 'json', 'region.json'), JSON.stringify([r1, r2, r3]));