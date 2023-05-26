import {Component} from '@angular/core';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent {

	url_value = {
		email: '811129@qq.com',
		url: '',
	};

	products = [
		{
			url: 'https://afdian.net/order/create?product_type=1&plan_id=0ed84074e5b711edb77c52540025c377&sku=%5B%7B%22sku_id%22%3A%220edb2082e5b711edb33152540025c377%22,%22count%22%3A1%7D%5D',
			name: '第11关激活码'
		},
		{
			url: 'https://afdian.net/order/create?product_type=1&plan_id=5b647304e5b711edb18d52540025c377&sku=%5B%7B%22sku_id%22%3A%225b6768d4e5b711edbf5852540025c377%22,%22count%22%3A1%7D%5D',
			name: '第12关激活码'
		},
		{
			url: 'https://afdian.net/order/create?product_type=1&plan_id=822360aee5b711ed817a52540025c377&sku=%5B%7B%22sku_id%22%3A%2282262690e5b711edbb5b52540025c377%22,%22count%22%3A1%7D%5D',
			name: '第13关激活码'
		},
		{
			url: 'https://afdian.net/order/create?product_type=1&plan_id=ae1a848ae5b711edbfd852540025c377&sku=%5B%7B%22sku_id%22%3A%22ae1d5c14e5b711ed8ce452540025c377%22,%22count%22%3A1%7D%5D',
			name: '第14关激活码'
		},
		{
			url: 'https://afdian.net/order/create?product_type=1&plan_id=df1ea2d2e5b711edbede52540025c377&sku=%5B%7B%22sku_id%22%3A%22df218c86e5b711ed98d752540025c377%22,%22count%22%3A1%7D%5D',
			name: '第15关激活码'
		},
		{
			url: 'https://afdian.net/order/create?product_type=1&plan_id=8647c972f5ed11ed98df5254001e7c00&sku=%5B%7B%22sku_id%22%3A%22864aea1cf5ed11edaa715254001e7c00%22,%22count%22%3A1%7D%5D',
			name: '第16关激活码'
		},
		{url: 'https://afdian.net/order/create?plan_id=b0ed0668e5b911eda64852540025c377&product_type=2', name: '第11-15关合集'},
	];

	validateEmail(email: string) {
		//定义匹配模式变量
		const emailRegex = /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
		//如果邮箱地址为空或不满足模式，则返回false
		return !(!email || !emailRegex.test(email.trim()));

	}

}
