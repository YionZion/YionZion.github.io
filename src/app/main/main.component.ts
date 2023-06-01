import {Component} from '@angular/core';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent {

	show_modal = false;
	show_modal2 = false;
	show_tips = false;

	url_value = {
		email: '',
		url: '',
	};

	products = [
		{url: 'https://afdian.net/order/create?plan_id=b0ed0668e5b911eda64852540025c377&product_type=2', name: '染11-15合集'},
		{
			url: 'https://afdian.net/order/create?product_type=1&plan_id=0ed84074e5b711edb77c52540025c377&sku=%5B%7B%22sku_id%22%3A%220edb2082e5b711edb33152540025c377%22,%22count%22%3A1%7D%5D',
			name: '染11'
		},
		{
			url: 'https://afdian.net/order/create?product_type=1&plan_id=5b647304e5b711edb18d52540025c377&sku=%5B%7B%22sku_id%22%3A%225b6768d4e5b711edbf5852540025c377%22,%22count%22%3A1%7D%5D',
			name: '染12'
		},
		{
			url: 'https://afdian.net/order/create?product_type=1&plan_id=822360aee5b711ed817a52540025c377&sku=%5B%7B%22sku_id%22%3A%2282262690e5b711edbb5b52540025c377%22,%22count%22%3A1%7D%5D',
			name: '染13'
		},
		{
			url: 'https://afdian.net/order/create?product_type=1&plan_id=ae1a848ae5b711edbfd852540025c377&sku=%5B%7B%22sku_id%22%3A%22ae1d5c14e5b711ed8ce452540025c377%22,%22count%22%3A1%7D%5D',
			name: '染14'
		},
		{
			url: 'https://afdian.net/order/create?product_type=1&plan_id=df1ea2d2e5b711edbede52540025c377&sku=%5B%7B%22sku_id%22%3A%22df218c86e5b711ed98d752540025c377%22,%22count%22%3A1%7D%5D',
			name: '染15'
		},
		{
			url: 'https://afdian.net/order/create?product_type=1&plan_id=8647c972f5ed11ed98df5254001e7c00&sku=%5B%7B%22sku_id%22%3A%22864aea1cf5ed11edaa715254001e7c00%22,%22count%22%3A1%7D%5D',
			name: '染16'
		},
		{
			url: 'https://afdian.net/order/create?product_type=1&plan_id=4584825c009911eebab85254001e7c00&sku=%5B%7B%22sku_id%22%3A%224587dbaa009911ee9b055254001e7c00%22,%22count%22%3A1%7D%5D',
			name: '染17(5w内容，解锁学姐)'
		},
	];

	validateEmail(email: string) {
		//定义匹配模式变量
		const emailRegex = /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
		//如果邮箱地址为空或不满足模式，则返回false
		return !(!email || !emailRegex.test(email.trim()));

	}

	copy() {
		const text = `${this.url_value.url}&remark=${this.url_value.email}`;
		if (navigator.clipboard) {
			navigator.clipboard.writeText(text)
				.then(() => {
					this.show_tips = true;
				})
				.catch((err) => {
					console.error('复制失败: ', err);
				});
		} else {
			const textarea = document.createElement('textarea');
			textarea.value = text;
			document.body.appendChild(textarea);
			textarea.select();
			try {
				document.execCommand('copy');
				this.show_tips = true;
			} catch (err) {
			} finally {
				document.body.removeChild(textarea);
			}
		}
	}


}
