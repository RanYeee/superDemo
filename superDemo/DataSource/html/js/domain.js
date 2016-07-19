/**
 * #######领域模型
 */
/**
 * 药品类构造器
 * @param {Object} drugHouseId 药品id
 * @param {Object} drugName 药品名
 * @param {Object} universalName 通用名
 * @param {Object} norms 规格
 * @param {Object} usage 用法
 * @param {Object} dosage 用量
 * @param {Object} count 数量
 * @param {Object} patientUsed 病人是否使用过
 * @param {Object} price 单价
 * @param {Object} unit 单位
 */
function Drug(drugHouseId, drugName, universalName, norms, usage, dosage, count, patientUsed, price, unit) {
	this.drugHouseId = drugHouseId;
	this.drugName = drugName;
	this.universalName = universalName;
	this.norms = norms;
	this.usage = usage;
	this.dosage = dosage;
	this.count = count;
	this.patientUsed = patientUsed;
	this.price = price;
	this.unit = unit;
}

/**
 * 病人信息
 * @param {Object} id 病人id
 * @param {Object} idCardNo 身份证号
 * @param {Object} name 姓名
 * @param {Object} sex 性别
 * @param {Object} age 年龄
 * @param {Object} ageUnit 年龄单位
 * @param {Object} yerq 是否是婴儿：0 否 1是
 * @param {Object} telphone 联系电话
 * @param {Object} ywgms 是否有药物过敏史：0无 1有
 * @param {Object} ywgmsName 药物过敏史名称（ywgms为1时有值）
 * @param {Object} tsrq 是否是特殊人群：0否 1是
 * @param {Object} tsrqType 特殊人群种类：1孕妇 2产妇 3哺乳期妇女（tsrq为1时有值）
 * @param {Object} ggnbq 是否有肝功能不全:0否 1是
 * @param {Object} sgnbq 是否有肾功能不全：0否 1是
 * @param {Object} gxybs 是否有高血压病史：0否 1是
 * @param {Object} gxybsLevel 高血压病史等级：1 一级高血压 2 二级高血压 3 三级高血压
 * @param {Object} tnbs 是否有糖尿病史：0否 1是
 * @param {Object} tnbsType 糖尿病史类别，1：1型糖尿病 2：2型糖尿病 3： 妊娠糖尿病 4：继发性糖尿病:5： 其他特殊类型糖尿病
 * @param {Object} xzbs 是否有心脏病史：0否 1是
 * @param {Object} qttsjb 是否有其他特殊疾病：0否 1是
 * @param {Object} qttsjbName 其他特殊疾病名称（qttsjb为1时有值）
 * @param {Object} bllx 病历类型,1 住院 2门诊
 * @param {Object} getDrugWay 取药方式 1到店自取 2配送
 * @param {Object} blNo  病历号（住院号或门诊号)
 * @param {Object} blDepartment 医院科室
 * @param {Object} bedNo 病床号
 */
function Patient(id, idCardNo, name, sex, age, ageUnit, yerq, telphone, ywgms, ywgmsName, tsrq, tsrqType, ggnbq,
	sgnbq, gxybs, gxybsLevel, tnbs, tnbsType, xzbs, qttsjb, qttsjbName, bllx, getDrugWay, blNo, blDepartment, bedNo) {
	this.id = id;
	this.idCardNo = idCardNo;
	this.name = name;
	this.sex = sex;
	this.age = age;
	this.ageUnit = ageUnit;
	this.yerq = yerq;
	this.telphone = telphone;
	this.ywgms = ywgms;
	this.ywgmsName = ywgmsName;
	this.tsrq = tsrq;
	this.tsrqType = tsrqType;
	this.ggnbq = ggnbq;
	this.sgnbq = sgnbq;
	this.gxybs = gxybs;
	this.gxybsLevel = gxybsLevel;
	this.tnbs = tnbs;
	this.tnbsType = tnbsType;
	this.xzbs = xzbs;
	this.qttsjb = qttsjb;
	this.qttsjbName = qttsjbName;
	this.bllx = bllx;
	this.getDrugWay = getDrugWay;
	this.blNo = blNo;
	this.blDepartment = blDepartment;
	this.bedNo = bedNo;
}