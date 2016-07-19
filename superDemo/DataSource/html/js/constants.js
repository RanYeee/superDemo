/**
 * 此文件主要定义一些常量
 */
//--------------------------------------------------------------
/**
 * 电子处方订单状态定义
 */
OrderState = {
		//订单正常流程流程
		STATE_1_WAIT_DC: "1", //销售员申请
		STATE_3_DC_DEAL: "3", //医师受理中
		STATE_4_DC_OK: "4", //医师受理完成等待药师受理
		STATE_6_PHRA_DEAL: "6", //药师受理中
		STATE_9_PHRA_OK: "9", //药师审核通过，等待取药
		//门诊模式 START
		STATE_13_WAIT_ASSIT: "13", //等待协助
		STATE_14_ASSIT_ING: "14", //协助中
		STATE_16_ASSIT_OVER: "16", //协助完成
		//结算物流
		STATE_17_WAIT_PAY: "17", //待结算
		STATE_18_WAIT_DELIVER_GOODS: "18", //待发货
		STATE_19_WAIT_TAKE_DELIVER_GOODS: "19", //待收货
		//门诊模式 END
		STATE_10_EPORDER_SUCCESS: "10", //订单成功
		//订单反复,UI不需要体现
		STATE_7_PHRA_REFUSE: "7", //药师审核不通过等待医师修改处方
		STATE_8_DC_OK_REMAKE: "8", //医师修改处方完成，等待药师重新审核
		STATE_15_ASSIT_STOP: "15", //协助终止，可申请重新协助
		STATE_20_WAIT_DRUGSTORE_CHECKIN: "20", //待药店提交审方

		///////////////////  订单结束定义
		//订单关闭.其他
		STATE_5_DC_REFUSE_END: "5", //医师拒绝 END
		STATE_12_PHRA_REFUSE_END: "12", //药师拒绝直接END
		//订单超时关闭
		STATE_2_EPORDER_TIMEOUT: "2", //订单超时，订单关闭
		STATE_21_DC_DEAL_TIMEOUT: "21", //医师处理超时
		STATE_22_WAIT_PHRA_TIMEOUT: "22", //等待药师受理超时
		STATE_23_PHRA_DEAL_TIMEOUT: "23", //药师处理超时 
		STATE_24_TAKE_TIMEOUT: "24", //取药超时 
		STATE_25_WAIT_DC: "25", //等待医师受理超时
		STATE_26_WIAT_ASSIT_TIMEOUT: "26", //待协助超时
		STATE_27_ASSIT_TIMEOUT: "27", //协助中超时
		STATE_28_ASSIT_END_TIMEOUT: "28", //协助完成超时
		STATE_29_WAIT_PAY_TIMEOUT: "29", //待结算超时
		STATE_210_WAIT_DELIVER_GOODS: "210", //待发货超时
		STATE_211_WAIT_DC_REMAKE: "211", //药师审核不通过等待医师修改处方时超时
		STATE_212_ASSIST_STOP: "212", //协助终止时超时
		//订单取消关闭
		STATE_11_EPORDER_CANCEL: "11", //取消订单，订单关闭（药店销售员或门诊医生取消）
		STATE_110_CANCEL_WAIT_DC: "110", //等待医师受理时被取消
		STATE_111_CANCEL_DC_DEAL: "111", //医师受理中被取消
		STATE_112_CANCEL_WAIT_PHRA: "112", //等待药师受理时被取消
		STATE_113_CANCEL_PHRA_DEAL: "113", //药师受理中被取消
		STATE_114_CANCEL_TAKE_MEDICINE: "114", //等待取药时被取消
		STATE_115_CANCEL_WAIT_ASSIT: "115", //待协助时被取消
		STATE_116_CANCEL_ASSIT_ING: "116", //协助中被取消
		STATE_117_CANCEL_ASSIT_OVER: "117", //协助完成时被取消
		STATE_118_CANCEL_ASSIT_STOP: "118", //协助终止时被取消
		STATE_119_CANCEL_PAY: "119", //待结算时被取消
		STATE_1110_CANCEL_WAIT_DELIVER_GOODS: "1110", //待发货时被取消
		STATE_1111_CANCEL_WAIT_DC_REMAKE: "1111", //药师审核不通过等待医师修改处方时被取消
		
		isEndState:function(state){
			return state == this.STATE_10_EPORDER_SUCCESS || this.isFailState(state);
		},
		
		isFailState:function(state){
			return this.isCancelState(state) || this.isTimeOutState(state);
		},
		/**
		 * 是否是取消订单的状态
		 * @param {Object} state
		 */
		isCancelState:function(state){
			return state.startWith('11') || state==this.STATE_5_DC_REFUSE_END || state==this.STATE_12_PHRA_REFUSE_END;
		},
		
		isTimeOutState:function(state){
			return state != this.STATE_20_WAIT_DRUGSTORE_CHECKIN && state.startWith('2');
		}
	}
	/**
	 * 助状态定义
	 */
OrderHelpState = {
		EPORDER_ASSIST_STATE_1_ASSIST_ING: "1", //协助中
		EPORDER_ASSIST_STATE_2_ASSIST_OVER: "2", //协助完成
		EPORDER_ASSIST_STATE_3_ASSIST_STOP: "3" //协助终止
	}
	/**
	 * 订单进程 名称
	 */
OrderProcess = {
	EPORDER_PROCESS_1: "待处理",
	EPORDER_PROCESS_2: "开处方",
	EPORDER_PROCESS_3: "审核处方",
	EPORDER_PROCESS_4: "等待取药",
	EPORDER_PROCESS_4_OUTPATIENT_1: "待结算",
	EPORDER_PROCESS_4_OUTPATIENT_2: "待发货",
	EPORDER_PROCESS_4_OUTPATIENT_3: "待收货",
	EPORDER_PROCESS_5: "订单成功",
	EPORDER_PROCESS_6: "订单关闭"
}

/**
 * 订单类型
 */
OrderType = {
	/**
	 * 申请开处方
	 */
	TYPE_DRUGSTORE_ASSIST: "1", 
	TYPE_DRUGSTORE: "2", //申请审处方
	TYPE_OUTPATIENT: "3", //门诊医生开处方
	TYPE_OUTPATIENT_ASSIST: "4", //门诊医生协助开处方
	TYPE_ASSIST_OTHERS_EPORDER: "5", //协助别人的订单，逻辑上的定义
	TYPE_DTC: "6", //协助别人的订单，逻辑上的定义
	getOrderTypeName: function(orderType) { //获取订单类型的名称

		if (orderType) {
			if (this.TYPE_DRUGSTORE == orderType) {
				return "申请审处方";
			}
			if (this.TYPE_DRUGSTORE_ASSIST == orderType) {
				return "申请开处方";
			}
			if (this.TYPE_OUTPATIENT == orderType) {
				return "开处方";
			}
			if (this.TYPE_OUTPATIENT_ASSIST == orderType) {
				return "申请协助";
			}
			if (this.TYPE_ASSIST_OTHERS_EPORDER == orderType) {
				return "协助开处方";
			}
			if (this.TYPE_DTC == orderType) {
				return "到院处方";
			}
		} else {
			return "未知";
		}
	},
	/**
	 * 判断订单的来源，1来源药店 2来源医院
	 * @param {Object} orderType
	 */
	getOrderSource:function(orderType){
		var r='';
		if (orderType) {
			if (this.TYPE_DRUGSTORE == orderType) {
				r='1';
			}
			if (this.TYPE_DRUGSTORE_ASSIST == orderType) {
				r='1';
			}
			if (this.TYPE_OUTPATIENT == orderType) {
				r='2';
			}
			if (this.TYPE_OUTPATIENT_ASSIST == orderType) {
				r='2';
			}
			if (this.TYPE_DTC == orderType) {
				r='2';
			}
		} return r;
	}
}
/**
 * 用户类型
 */
UserType = {
		DZCF_DOCTOR: '20', //电子处方医师
		DZCF_MEDICINEMAN: '21', //电子处方药师
		DZCF_SALESMAN: '15',//药店销售人员
		DZCF_USER: '1' //普通用户
	}
