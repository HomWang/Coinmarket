<template>
  <section class="container" id="PersonalAssets">
        <div class="coin-market-Financial-right-title">
            <div class="coin-market-Financial-right-title-Content">
                <section class="coin-market-Financial-right-title-Content-Title">{{PersonalAsset}}</section>
                <section class="PersonalAssetsAddressManagement"><nuxt-link :to="{path:'AddressManagement'}">{{Currencyaddressmanagement}}</nuxt-link></section>
                <section class="coin-market-Financial-right-title-Content-ScreenCoin coin-market-Financial-right-title-Content-ScreenCoin-HideZero">
                    <section @click="ZeroHide"></section>
                    {{HideAssets}}
                </section>
                <section class="coin-market-Financial-right-title-Content-TotalAssets">
                    {{TotalAssets}}: {{totalUsdtAsset}} USDT ≈ {{totalCnyAsset}} CNY
                </section>
            </div>
        </div>
        <section class="coin-market-Financial-right-List">
            <my-Wave v-show="LoadingState" :ParentHeight="679"></my-Wave>
            <section v-show="LoadingState === false" class="coin-market-Financial-right-List-Details">
                <section class="coin-market-Financial-right-List-Details">
                    <section class="coin-market-Financial-right-List-Details-title" v-bind:style="{width: item.TitleWidth}" v-for="(item, index) in PersonalAssetsTitle" v-bind:key="index">
                        {{item.TitleName}}
                    </section>
                </section>
                <section class="coin-market-Financial-right-List-Details" v-for="(ItemList, index) in PersonalAssetsList" :key="index">
                    <section class="coin-market-Financial-right-List-Details-list">
                        {{ItemList.coinName}}
                    </section>
                    <section class="coin-market-Financial-right-List-Details-list">
                        {{ItemList.total_s}}
                    </section>
                    <section class="coin-market-Financial-right-List-Details-list">
                        {{ItemList.frozen_s}}
                    </section>
                    <section class="coin-market-Financial-right-List-Details-list">
                        {{ItemList.totalandfrozen_s}}
                    </section>
                    <section class="coin-market-Financial-right-List-Details-list TextYellowColor" @click="Selectlist($event, ItemList.coinId, ItemList.coinName, ItemList.topuptips, ItemList.tradeAreas)">
                        <span>{{IFjsStringObj.TradingArea}}</span>
                    </section>
                    <section class="coin-market-Financial-right-List-Details-list TextYellowColor" v-show="ItemList.recharge === true" @click="Selectlist($event, ItemList.coinId, ItemList.coinName, ItemList.topuptips)">
                        <span>{{IFjsStringObj.Recharge}}</span>
                    </section>
                    <section class="coin-market-Financial-right-List-Details-list TextYellowColor" v-show="ItemList.withdraw === true" @click="Selectlist($event, ItemList.coinId, ItemList.coinName, ItemList.withdrawtips)">
                        <span>{{IFjsStringObj.Withdraw}}</span>
                    </section>
                </section>
            </section>
            <!-- <a href="javascript:void(0)" v-show="PersonalAssetsTitle <= 10">{{this.$t('finance.entrustment.More')}}</a> -->
        </section>
        <div id="Recharge" v-show="RechargeState">
            <section class="Recharge-Content">
                <section class="Recharge-Content-Title">{{DepositAddress}}</section>
                <section class="Recharge-Content-Line">
                    <span id="RechargeAddress">{{message}}</span>
                    <span v-clipboard:copy="message" v-clipboard:success="onCopy" v-clipboard:error="onError">{{Copy}}</span>
                    <span @click="createQrc">{{QRcode}}</span>
                </section>
                <div v-show="QRCodeState" class="banner-box">
                    <canvas id="qrccode-canvas"></canvas>
                </div>
                <section class="Recharge-Content-Describe">
                    <section v-html="this.topuptips"></section>
                    <!-- <p>{{Tips}}</p>
                    <ul>
                        <li>{{Tips1}}</li>
                        <li>{{Tips2}}</li>
                        <li>{{Tips3}}</li>
                        <li>{{Tips4}}</li>
                        <li>{{Tips5}}</li>
                        <li>{{Tips6}}</li>
                    </ul> -->
                </section>
                <section class="Recharge-Content-ChargeRecord">
                    <nuxt-link :to="{path: '/Financial/account'}">{{RechargeRecord}}</nuxt-link>
                </section>
            </section>
        </div>
        <div id="Currency" v-show="CurrencyState">
            <section class="Recharge-Content">
                <section class="Currency-Address">
                    <p>{{WithdrawAddress}}</p>
                    <el-select v-model="AddressListValue" @change="AddressListClick" :placeholder="PleaseChoose" style="width: 100%;">
                        <el-option v-for="item in AddressList" :key="item.fid" :value="item.fid" :label="item.fadderess">
                        </el-option>
                    </el-select>
                </section>
                <section class="Currency-Number">
                    <p>{{WithdrawNumber}}</p>
                    <section class="Currency-Number-right">
                        <span>{{available}}：{{AddressNumber.total}}</span>
                        <span>{{Quota}}：{{AddressNumber.withdrawMax}}</span>
                    </section>
                    <input type="Number" v-model="InputNumberValue" @input="InputNumber" onkeyup="value=value.replace(/[^\d.]/g,'') " ng-pattern="/[^a-zA-Z]/">
                    <section class="Currency-Number-title">{{AddressNumber.coinName}}</section>
                </section>
                <section class="Recharge-Service">
                    <section class="Recharge-Service-left">
                        <section class="Recharge-Service-left-title">{{ServiceCharge}}</section>
                        <section class="Recharge-Service-left-Number">
                            {{AddressNumber.withdrawFee}}
                            <section class="Recharge-Service-left-Number-Title">{{AddressNumber.coinName}}</section>
                        </section>
                    </section>
                    <section class="Recharge-Service-right">
                        <section class="Recharge-Service-right-title">{{Numberofaccounts}}</section>
                        <section class="Recharge-Service-right-Number">
                            {{ArrivalNumber}}
                            <section class="Recharge-Service-right-Numbe-Title">{{AddressNumber.coinName}}</section>
                        </section>
                    </section>
                </section>
                <section class="CurrencySubmit" @click="AddressCoin_manual">{{Submit}}</section>
                <section class="Recharge-Content-Describe">
                    <section v-html="this.withdrawtips"></section>
                    <!-- <p>{{Tips}}</p>
                    <ul>
                        <li>{{Tips1}}</li>
                        <li>{{Tips2}}</li>
                        <li>{{Tips3}}</li>
                        <li>{{Tips4}}</li>
                        <li>{{Tips5}}</li>
                        <li>{{Tips6}}</li>
                    </ul> -->
                </section>
            </section>
        </div>
        <div id="TradingArea" v-show="TradingAreaState">
            <a href="javascript:void(0)" @click="TradingArea(item.id)" v-for="(item, index) in tradeAreas" :key="index">
                {{CoinName}}/{{item.name}}
            </a>
        </div>
        <transition name="el-fade-in-linear">
            <section id="AddressCoverLayer" v-show="VerificationState">
                <section class="AddressCoverLayer-Content">
                    <section class="AddressCoverLayer-Content-Title">
                        <img src="@/assets/img/CurrencyLogo/613997814333800743.png" alt="">
                        <span>{{Securityverification}}</span>
                        <img src="@/assets/img/CurrencyLogo/x.png" class="AddressCoverLayer-Content-Title-X" @click="VerificationClose"/>
                    </section>
                    <section class="AddressCoverLayer-Content-Content">
                        <section class="AddressCoverLayer-Content-Content-Code">
                            <p>{{SMSauthenticationcode}}</p>
                            <section class="AddressCoverLayer-Content-Content-Code-Input">
                                <input type="text" v-model="phoneCode">
                                <button class="AddressCoverLayer-Content-Content-GetCode" type="button" :disabled="PhoneDisabled" @click="GetPhoneCode">{{theverifyingcode}}</button>
                            </section>
                        </section>
                        <section class="AddressCoverLayer-Content-Content-Code">
                            <p>{{Googleverificationcode}}</p>
                            <section class="AddressCoverLayer-Content-Content-Code-Input">
                                <input type="text" v-model="totpCode">
                            </section>
                        </section>
                        <section class="AddressCoverLayer-Content-Content-Code">
                            <p>{{Transactionpassword}}</p>
                            <section class="AddressCoverLayer-Content-Content-Code-Input">
                                <input type="password" v-model="tradePwd">
                            </section>
                        </section>
                        <button class="AddressButton" @click="Add_Address">{{Submit}}</button>
                    </section>
                </section>
            </section>
        </transition>
  </section>
</template>

<script>

import {PersonalCenter} from '~/api/PersonalCenter';
import userRequest from '~/api/userRequest';
import QRCode from 'qrcode'
import md5 from 'js-md5';
import Bus from '~/plugins/bus.js'

export default {
    name: "PersonalAssets",
    data() {
        return {
            LoadingState: true,
            totalUsdtAsset: '',//USDT总资产
            totalCnyAsset: '',//人民币总资产
            totpCode: '',
            phoneCode: '',
            emailCode: '',
            PhoneTime: 0,
            PhoneDisabled:false,
            PhoneBtntxt:"",
            QRCodeState: false,
            RechargeState: false,
            CurrencyState: false,
            TradingAreaState: false,
            VerificationState: false,
            PersonalAssetsTitle: [{
                TitleName: this.$t('finance.asset.Coin'),
                TitleWidth: "10%"
            },{
                TitleName: this.$t('finance.asset.AvailableAssets'),
                TitleWidth: "21%"
            },{
                TitleName: this.$t('finance.asset.FrozenAssets'),
                TitleWidth: "21%"
            },{
                TitleName: this.$t('finance.asset.Amount'),
                TitleWidth: "21%"
            },
            {
                TitleName: this.$t('finance.asset.GoTrade'),
                TitleWidth: "15%"
            },
            {
                TitleName: this.$t('finance.asset.Operation'),
                TitleWidth: "11.5%"
            }],
            IFjsStringObj: {
                Recharge: this.$t('finance.asset.Recharge'),
                Withdraw: this.$t('finance.asset.Withdraw'),
                TradingArea: this.$t('finance.asset.TradingArea'),
                Replicatingsuccess: this.$t('finance.asset.Replicatingsuccess'),
                Unabletocopytext: this.$t('finance.asset.Unabletocopytext'),
                Acquisition: this.$t('finance.asset.Acquisition'),
                Linkcannotbeempty: this.$t('finance.asset.Linkcannotbeempty'),
                PleaseContact: this.$t('finance.asset.PleaseContact'),
                NotNull: this.$t('finance.asset.NotNull'),
                Reselection: this.$t('finance.asset.Reselection'),
                sorry: this.$t('finance.asset.sorry'),
                Insufficientquantity: this.$t('finance.asset.Insufficientquantity'),
                Recapture: this.$t('finance.asset.Recapture'),
                GetCode: this.$t('finance.asset.GetCode')
            },
            PersonalAssetsList: [],
            wallets_obj: {
                hideZero: 'NO',
                currentPage: 1,
            },
            message: '',
            InputNumberValue: '',
            AddressList: [],
            AddressListValue: '',
            AddressListId: '',
            AddressNumber:[],
            InputNumberValueFee: '',
            ArrivalNumber: '',
            tradePwd: '',
            CoinID: '',
            CoinName: '',
            topuptips: '',//充币提示
            withdrawtips: '',//提币提示
            tradeAreas: '',//交易对
            TotalAssets: this.$t('finance.asset.TotalAssets'),
            PersonalAsset: this.$t('finance.asset.PersonalAsset'),
            HideAssets: this.$t('finance.asset.HideAssets'),
            Currencyaddressmanagement: this.$t('finance.asset.Currencyaddressmanagement'),
            DepositAddress: this.$t('finance.asset.DepositAddress'),
            Copy: this.$t('finance.asset.Copy'),
            QRcode: this.$t('finance.asset.QRcode'),
            RechargeRecord: this.$t('finance.asset.RechargeRecord'),
            More: this.$t('finance.asset.More'),
            WithdrawAddress: this.$t('finance.asset.WithdrawAddress'),
            WithdrawNumber: this.$t('finance.asset.WithdrawNumber'),
            available: this.$t('finance.asset.available'),
            Quota: this.$t('finance.asset.Quota'),
            ServiceCharge: this.$t('finance.asset.ServiceCharge'),
            Numberofaccounts: this.$t('finance.asset.Numberofaccounts'),
            Submit: this.$t('finance.asset.Submit'),
            StudyArea: this.$t('finance.asset.StudyArea'),
            USDT: this.$t('finance.asset.USDT'),
            QuitArea: this.$t('finance.asset.QuitArea'),
            Securityverification: this.$t('finance.asset.Securityverification'),
            SMSauthenticationcode: this.$t('finance.asset.SMSauthenticationcode'),
            Googleverificationcode: this.$t('finance.asset.Googleverificationcode'),
            Transactionpassword: this.$t('finance.asset.Transactionpassword'),
            theverifyingcode: this.$t('finance.asset.theverifyingcode'),
            Replicatingsuccess: this.$t('finance.asset.Replicatingsuccess'),
            Unabletocopytext: this.$t('finance.asset.Unabletocopytext'),
            Acquisition: this.$t('finance.asset.Acquisition'),
            Linkcannotbeempty: this.$t('finance.asset.Linkcannotbeempty'),
            PleaseContact: this.$t('finance.asset.PleaseContact'),
            NotNull: this.$t('finance.asset.NotNull'),
            Reselection: this.$t('finance.asset.Reselection'),
            sorry: this.$t('finance.asset.sorry'),
            Insufficientquantity: this.$t('finance.asset.Insufficientquantity'),
            Pleaserechoose: this.$t('finance.asset.Pleaserechoose'),
            Recapture: this.$t('finance.asset.Recapture'),
            GetCode: this.$t('finance.asset.GetCode'),
            BindPhone: this.$t('finance.asset.BindPhone'),
            PleaseChoose: this.$t('finance.asset.PleaseChoose'),
        }
    },
    mounted(){
        this.Postwallets();
    },
    methods: {
        onCopy(e){
            this.$Message({
                message: this.IFjsStringObj.Replicatingsuccess+'！',
                type: 'success',
                center: true,
            });
        },
        onError(e) {
            this.$Message({
                message: this.IFjsStringObj.Unabletocopytext+'！',
                type: 'error',
                center: true,
            });
        },
        TradingArea(areaId){
          let payload = {
              id: this.CoinID
          }
          this.$store.commit('SET_AREA_ID', Number(areaId));
          this.$store.commit('SET_COIN', payload);
          this.$router.push({
              path: '/trade'
          });
          this.$destroy();
        },
        PostCoin_address(CoinId){
            let SymbolCoinId = {
                symbol: CoinId
            }
            let RechargeAddress = document.getElementById('RechargeAddress');
            RechargeAddress.innerText = this.IFjsStringObj.Acquisition + '...';
            // 调用委单记录及操作
            PersonalCenter.coin_address(SymbolCoinId).then((response) => {
                this.message = RechargeAddress.innerText = response.result;
            }).catch((err) => {
              console.log('login err: ', err);
            });
        },
        Postwallets(){
            // 调用个人资产及操作
            PersonalCenter.wallets(this.wallets_obj).then((response) => {
                this.PersonalAssetsList = response.result.userWalletList;
                this.totalUsdtAsset = response.result.totalUsdtAsset?response.result.totalUsdtAsset:0;
                this.totalCnyAsset = response.result.totalCnyAsset?response.result.totalCnyAsset:0;
                this.LoadingState = false;
            }).catch((err) => {
              console.log('login err: ', err);
            });
        },
        createQrc(e){
            let code = e.target.parentNode.childNodes[0].innerText;
            if (!code) {
                this.$Message({
                    message: this.IFjsStringObj.Linkcannotbeempty,
                    type: 'error',
                    center: true,
                });
                return false
            }else if(code !== this.IFjsStringObj.PleaseContact+'！'){
                let canvas = document.getElementById('qrccode-canvas');
                QRCode.toCanvas(canvas, code, (error) => {
                    if (error) {
                        console.log(error)
                    } else {
                        this.QRCodeState = true;
                    }
                })
            }
        },
        ZeroHide(e){
            if(this.wallets_obj.hideZero === 'NO'){
                this.wallets_obj.hideZero = 'YES';
                e.target.style.backgroundColor = "#525f85";
            }else{
                this.wallets_obj.hideZero = 'NO';
                e.target.style.backgroundColor = "#222222";
            }
            this.TradingAreaState = false;
            this.RechargeState = false;
            this.CurrencyState = false;
            this.Postwallets();
        },
        enter: function(e){
            if(e.target.innerText === this.IFjsStringObj.TradingArea){
                this.TradingAreaState = true;
                let Recharge = document.getElementById("TradingArea");
                e.target.insertBefore(Recharge, e.target.parentNode[0])
            }
        },
        leave: function(e){
            this.TradingAreaState = false;
        },
        Selectlist(e, coinid, coinname, tips, tradeAreas){

            this.AddressListValue = '';
            this.RechargeState = false;
            this.CurrencyState = false;
            this.TradingAreaState = false;
            if(e.currentTarget.childNodes[0].innerText === this.IFjsStringObj.Recharge){
                this.topuptips = tips;
                this.PostCoin_address(coinid);
                this.CurrencyState = false;
                this.TradingAreaState = false;
                this.RechargeState = true;
                this.QRCodeState = false;
                let Recharge = document.getElementById("Recharge");
                e.currentTarget.parentNode.insertBefore(Recharge, e.currentTarget.parentNode[0]);
            }else if(e.currentTarget.childNodes[0].innerText === this.IFjsStringObj.Withdraw){
                this.withdrawtips = tips;
                this.RechargeState = false;
                this.TradingAreaState = false;
                this.CurrencyState = true;
                let Recharge = document.getElementById("Currency");
                e.currentTarget.parentNode.insertBefore(Recharge, e.currentTarget.parentNode[0]);
                for (let i = 0; i < this.PersonalAssetsList.length; i++) {
                    if(this.PersonalAssetsList[i].coinId === coinid){
                        this.AddressNumber  = this.PersonalAssetsList[i];
                    }
                }
                this.coin_withdraw_address(coinid);
            }else if(e.currentTarget.childNodes[0].innerText === this.IFjsStringObj.TradingArea){
                this.CoinID = coinid;
                this.CoinName = coinname;
                this.tradeAreas = tradeAreas;
                this.RechargeState = false;
                this.CurrencyState = false;
                this.TradingAreaState = true;
                this.QRCodeState = false;
                let Recharge = document.getElementById("TradingArea");
                e.currentTarget.insertBefore(Recharge, e.currentTarget.parentNode[0]);
            }
        },
        AddressListClick(id){
            this.AddressListId = id;
        },
        coin_withdraw_address(SymbolID){
            //获取提现地址列表
            let SymbolObj = {
                symbol: Number(SymbolID) ? Number(SymbolID): ''
            }
            PersonalCenter.coin_withdraw_address(SymbolObj).then((response) => {
                this.AddressList = response.result;
            }).catch((err) => {
                console.log('login err: ', err);
            });
        },
        InputNumber(){
            this.InputNumberValue > this.AddressNumber.withdrawMax && (this.InputNumberValue = this.AddressNumber.withdrawMax,this.ArrivalNumber = this.InputNumberValue - this.InputNumberValueFee);
            this.InputNumberValue = this.InputNumberValue.replace(/[^\d.]/g,"");
            this.InputNumberValue = this.InputNumberValue.replace(/\.{2,}/g,".");
            this.InputNumberValue = this.InputNumberValue.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            this.InputNumberValue = this.InputNumberValue.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d\d\d\d\d).*$/,'$1$2.$3');
            if(this.InputNumberValue.indexOf(".")< 0 && this.InputNumberValue !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                this.InputNumberValue = parseFloat(this.InputNumberValue);
            }
            this.ArrivalNumber = this.InputNumberValue - this.AddressNumber.withdrawFee < 0?0:this.InputNumberValue - this.AddressNumber.withdrawFee;
            //判断提币数量是否大于限额，如果大于限额将值设置为最大额度
            this.InputNumberValue > this.AddressNumber.withdrawMax && (this.InputNumberValue = this.AddressNumber.withdrawMax,this.ArrivalNumber = this.InputNumberValue - this.AddressNumber.withdrawFee);
            // this.ArrivalNumber = this.InputNumberValue - this.InputNumberValueFee;
        },
        AddressCoin_manual(){
            (this.InputNumberValue < this.AddressNumber.withdrawMin) && (this.$Message({message: `${this.$t('finance.account.SorryForMin')}${this.AddressNumber.withdrawMin}${this.AddressNumber.coinName}${this.$t('finance.account.LimitVol')}`+`！`,type: 'error',center: true,}), this.InputNumberValue = this.AddressNumber.withdrawMin, this.ArrivalNumber = this.InputNumberValue - this.AddressNumber.withdrawFee)
            ||  (this.InputNumberValue > this.AddressNumber.withdrawMax) && (this.$Message({message: `${this.$t('finance.account.SorryForMax')}${this.AddressNumber.withdrawMax}${this.AddressNumber.coinName}${this.$t('finance.account.LimitVol')}`+`！`,type: 'error',center: true,}), this.InputNumberValue = this.AddressNumber.withdrawMax, this.ArrivalNumber = this.InputNumberValue - this.AddressNumber.withdrawFee)
            ||  (this.InputNumberValue > this.AddressNumber.total) && (this.$Message({message: `${this.$t('finance.account.SorryForMax')}${this.AddressNumber.total}${this.AddressNumber.coinName}${this.$t('finance.account.AvailableVol')}`+`！`,type: 'error',center: true,}), this.InputNumberValue = this.AddressNumber.total, this.ArrivalNumber = this.InputNumberValue - this.AddressNumber.withdrawFee)
            ||  userRequest.getSecurityLevel().then(res => {
                    res.result.fuser.fistelephonebind === true
                    &&  this.AddressListValue !== ''
                    &&  this.InputNumberValue !== ''
                    ?   this.VerificationState = true
                    :   this.$Message({message: this.IFjsStringObj.NotNull+`！`,type: 'error',center: true,})
                    ||  this.$Message({message: this.BindPhone+`！`,type: 'warning',center: true,})

                    // if(res.result.fuser.fistelephonebind === true){
                    //     if(this.AddressListValue !== '' && this.InputNumberValue !== ''){
                    //         this.VerificationState = true;
                    //     }else{
                    //         this.$Message({
                    //             message: this.IFjsStringObj.NotNull+`！`,
                    //             type: 'error',
                    //             center: true,
                    //         });
                    //     }
                    // }else{
                    //     this.$Message({
                    //         message: this.BindPhone,
                    //         type: 'warning',
                    //         center: true,
                    //     });
                    // }
                });
            // if(this.InputNumberValue < this.AddressNumber.withdrawMin){
            //     // this.InputNumberValue = this.AddressNumber.withdrawMin;
            //     this.$Message({
            //         message: '对不起不能小于最小限额数量'+`！`,
            //         type: 'error',
            //         center: true,
            //     });
            // }else{
            //     userRequest.getSecurityLevel().then(res => {
            //         if(res.result.fuser.fistelephonebind === true){
            //             if(this.AddressListValue !== '' && this.InputNumberValue !== ''){
            //                 this.VerificationState = true;
            //             }else{
            //                 this.$Message({
            //                     message: this.IFjsStringObj.NotNull+`！`,
            //                     type: 'error',
            //                     center: true,
            //                 });
            //             }
            //         }else{
            //             this.$Message({
            //                 message: this.BindPhone,
            //                 type: 'warning',
            //                 center: true,
            //             });
            //         }
            //     });
            // }
        },
        VerificationClose(){
          this.VerificationState = false;
        },
        Add_Address(){
            if(this.AddressListValue !== '' && this.InputNumberValue !== ''){
                if(this.InputNumberValue <= this.AddressNumber.withdrawMax && this.InputNumberValue <= this.AddressNumber.total && this.InputNumberValue >= this.AddressNumber.withdrawMin){
                    //虚拟币提现
                    let MD5tradePwd = md5(md5(md5(this.tradePwd)));
                    let Coin_manualObj = {
                        withdrawAddr: this.AddressListId,//提现ID
                        // withdrawAddr: this.AddressListValue,//提现ID
                        // withdrawAddr: this.AddressNumber.coinId,//提现ID
                        withdrawAmount: Number(this.InputNumberValue),//提现数量
                        tradePwd: MD5tradePwd,//交易密码
                        totpCode: this.totpCode,//谷歌验证码
                        phoneCode: this.phoneCode,//手机验证码
                        symbol: this.AddressNumber.coinId,//币种
                        // btcfeesIndex: this.AddressNumber.withdrawFee,//手续费
                        //btcfeesIndex: this.InputNumberValueFee,//手续费
                    }
                    PersonalCenter.coin_manual(Coin_manualObj).then((response) => {
                        this.$Message({
                            message: response.msg,
                            type: 'success',
                            center: true,
                        });
                        this.VerificationState = false;
                        this.Postwallets();
                        this.AddressListValue = '';
                        this.ArrivalNumber = '';
                        this.InputNumberValue = '';
                        this.otpCode = '';
                        this.center = '';
                        this.tradePwd = '';
                    }).catch((err) => {
                        console.log('login err: ', err);
                    });
                }else{
                    this.$Message({
                        message: this.IFjsStringObj.sorry+`${this.AddressNumber.coinName}` + this.IFjsStringObj.Insufficientquantity + '...',
                        type: 'error',
                        center: true,
                    });
                    this.AddressListValue = '';
                    this.ArrivalNumber = '';
                    this.InputNumberValue = '';
                    this.otpCode = '';
                    this.center = '';
                    this.tradePwd = '';
                    // this.InputNumberValueFee = this.AddressNumber.withdrawFee;
                }
            }else{
                this.$Message({
                    message: this.IFjsStringObj.Reselection+`...`,
                    type: 'error',
                    center: true,
                });
            }
        },
        //短信发送验证码
        GetPhoneCode(){
            let ObjType = {
                type: 105//105 提现短信验证码
            }
            PersonalCenter.send_sms(ObjType).then((response) => {
                this.PhoneTime = 60;
                this.PhoneDisabled = true;
                this.PhoneTimer();
            }).catch((err) => {
                console.log('login err: ', err);
            });
        },
        PhoneTimer(){
            if (this.PhoneTime > 0) {
                this.PhoneTime--;
                this.theverifyingcode = this.PhoneTime + this.IFjsStringObj.Recapture;
                setTimeout(this.PhoneTimer, 1000);
            } else{
                this.PhoneTime = 0;
                this.theverifyingcode = this.IFjsStringObj.GetCode;
                this.PhoneDisabled=false;
            }
        },
    }
}
</script>

<style >
    .PersonalAssets-Title>.coin-market-Financial-right-title-Content-Title{
        color: #ffc200;
    }
    .PersonalAssets-Title>.coin-market-Financial-right-title-Content-ScreenCoin{
        margin-left: 20px;
    }
    .coin-market-Financial-right-List-Details>.coin-market-Financial-right-List-Details-list{
        font-weight: 600;
    }
    .coin-market-Financial-right-List-Details>.coin-market-Financial-right-List-Details-list:nth-child(5), .coin-market-Financial-right-List-Details>.coin-market-Financial-right-List-Details-title:nth-child(5){
        padding-right: 30px;
    }
    .coin-market-Financial-right-List-Details>.coin-market-Financial-right-List-Details-list:nth-child(6), .coin-market-Financial-right-List-Details>.coin-market-Financial-right-List-Details-list:nth-child(7){
        text-align: center;
        width: calc(90% / 5 / 2) !important;
    }
    .coin-market-Financial-right-List-Details-title, .coin-market-Financial-right-List-Details-list{
        width: calc(90% / 5) !important;
    }
    .coin-market-Financial-right-List-Details-title:nth-child(1), .coin-market-Financial-right-List-Details-list:nth-child(1){
        width: 10% !important;
    }
    .coin-market-Financial-right-List-Details-title, .coin-market-Financial-right-List-Details-list{
        text-align: right;
        float: left;
        font-size: 15px;
        color: #d8d8d8;
        padding: 16px 13px;
    }
    .coin-market-Financial-right-List-Details-title:nth-child(6){
        text-align: center;
    }
    .coin-market-Financial-right-List-Details-list{
        font-size: 14px;
    }
    .TextYellowColor{
        color: #91a7c2 !important;
    }
    .TextYellowColor:hover{
        color: #ffc200 !important;
        cursor: pointer;
    }
    .coin-market-Financial-right-List-Details-title:nth-child(1), .coin-market-Financial-right-List-Details>.coin-market-Financial-right-List-Details-list:nth-child(1){
        padding-left: 0;
    }
    .coin-market-Financial-right-List-Details-title:nth-child(6), .coin-market-Financial-right-List-Details>.coin-market-Financial-right-List-Details-list:nth-child(6), .coin-market-Financial-right-List-Details>.coin-market-Financial-right-List-Details-list:nth-child(7){
        padding-right: 0;
    }
    /* .coin-market-Financial-right-List-Details-title:nth-child(5), .coin-market-Financial-right-List-Details>.coin-market-Financial-right-List-Details-list:nth-child(5){
        text-align: center;
    } */
    .coin-market-Financial-right-List-Details-title:nth-child(1), .coin-market-Financial-right-List-Details-list:nth-child(1), .coin-market-Financial-right-List-Details-list:nth-child(8n){
        text-align: left;
    }
    #Recharge, #Currency{
        padding-top: 46px;
        width: 100%;
        margin: 0 auto;
        background-color: #222222;
    }
    .Recharge-Content{
        padding: 15px;
        font-size: 16px;
    }
    .Recharge-Content-Title{
        font-size: 16px;
        color: #d8d8d8;
    }
    .Recharge-Content-Line{
        padding: 13px 0;
        font-size: 19px;
        color: #d8d8d8;
    }
    .Recharge-Content-Line>span:nth-child(2):hover, .Recharge-Content-Line>span:nth-child(3):hover, .Recharge-Content-ChargeRecord:hover{
        color: #9ea7c2;
        cursor: pointer;
    }
    .Recharge-Content-Line>span:nth-child(1){
        font-size: 23px;
        min-width: 437px;
    }
    .Recharge-Content-Line>span:nth-child(2), .Recharge-Content-Line>span:nth-child(3){
        padding-left: 50px;
        font-size: 19px;
    }
    .Recharge-Content-Describe>ul{
        padding-left: 15px;
    }
    .Recharge-Content-Describe>ul>li{
        list-style: disc;
        padding: 3px 0;
    }
    .Recharge-Content-ChargeRecord{
        margin: 13px 0;
        max-width: 110px;
        height: 23px;
        border-radius: 4px;
        border: 1px solid #6d7da8;
        font-size: 14px;
        text-align: center;
        line-height: 23px;
    }
    .Recharge-Content-ChargeRecord>a{
        color: #6d7da8;
    }
    .Recharge-Content-ChargeRecord>a:hover{
        color: #9ea7c2;
    }
    .coin-market-Financial-right-List-Details, .Recharge-Service{
        position: relative;
        overflow: hidden;
    }
    #Currency>.Recharge-Content>.Recharge-Content-Describe{
        padding-top: 24px;
    }
    .Recharge-Content-Describe{
        color: #9f9f9f;
    }
    .CurrencySubmit:hover{
        background-color: #55607e;
        cursor: pointer;
    }
    .CurrencySubmit{
        width: 210px;
        height: 40px;
        line-height: 40px;
        margin: 0 auto;
        text-align: center;
        color: #d8d8d8;
        background-color: #525f85;
        font-size: 18px;
        border-radius: 5px;
    }
    .Currency-Address>.el-select{
        border: 1px solid #d8d8d8;
        border-radius: 5px;
    }
    .Currency-Address, .Currency-Number, .Recharge-Service{
        padding-bottom: 21px;
    }
    .Currency-Address>input, .Currency-Number>input{
        width: 100%;
        height: 30px;
        border-radius: 5px;
        outline: none;
        border: 1px solid #d8d8d8;
        color: #d8d8d8;
        font-size: 14px;
        padding: 0 15px;
        background-color: #282828;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
    }
    .Currency-Address>p, .Currency-Number>p{
        font-size: 14px;
    }
    .Currency-Number{
        position: relative;
        overflow: hidden;
    }
    .Currency-Number>p{
        width: 20%;
        float: left;
    }
    .Currency-Number-right{
        float: right;
        text-align: right;
        width: 80%;
    }
    .Currency-Number-right>span{
        color: #6D7DA8;
    }
    .Currency-Number-right>span:nth-child(1){
        margin-right: 40px;
    }
    .Currency-Number-title{
        font-size: 14px;
        color: #d8d8d8;
        position: absolute;
        right: 15px;
        top: 28px;
        height: 26px;
        line-height: 26px;
    }
    .Recharge-Service-left, .Recharge-Service-right{
        width: 454.5px;
        float: left;
    }
    .Recharge-Service-left{
        margin-right: 34px;
    }
    .Recharge-Service-left-title, .Recharge-Service-right-title{
        font-size: 16px;
        color: #d8d8d8;
        padding-bottom: 14px;
    }
    .Recharge-Service-left-Number, .Recharge-Service-right-Number{
        position: relative;
        width: 100%;
        height: 38px;
        line-height: 38px;
        border-radius: 5px;
        padding: 0 15px;
        background-color: #d8d8d8;
        color: #9f9f9f;
        font-size: 14px;
    }
    .Recharge-Service-left-Number-Title, .Recharge-Service-right-Numbe-Title{
        font-size: 14px;
        color: #6D7DA8;
        position: absolute;
        right: 15px;
        top: 0;
        height: 38px;
        line-height: 38px;
    }
    #TradingArea{
        left: 13px;
        position: relative;
        top: 16px;
        font-weight: 300;
        width: 100%;
        padding: 5px 0px;
        border-radius: 3px;
        font-size: 14px;
        background-color: #201f1d;
    }
    #TradingArea:before{
        display: block;
        content: '';
        border-width: 8px 8px 8px 8px;
        border-style: solid;
        border-color: transparent transparent #201f1d transparent;

        /* 定位 */
        position: absolute;
        left: 65%;
        top: -16px;
    }
    #TradingArea>a{
        text-align: center;
        display: block;
        color: #d8d8d8;
        padding: 5px 0;
    }
    #TradingArea>a:hover{
        background-color: #525f85;
    }
    .PersonalAssetsAddressManagement{
        position: relative;
        overflow: hidden;
        float: right;
        min-width: 110px;
        font-size: 15px;
        cursor: pointer;
        margin-left: 65px;
    }
    .PersonalAssetsAddressManagement>a{
        color: #d8d8d8;
    }
    #AddressCoverLayer{
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 999;
        background: rgba(0, 0, 0, 0.5);
    }
    .AddressCoverLayer-Content{
        position: fixed;
        top: 20%;
        left: 50%;
        width: 492px;
        padding-bottom: 20px;
        background-color: #404051;
        margin-left: -246px;
        border-radius: 5px;
        border: 4px solid #666666;
    }
    .AddressCoverLayer-Content-Title{
        padding: 16px 35px;
        font-size: 24px;
        height: 65px;
        width: 100%;
        color: #ffc200;
        background-color: #1c1f2a;
        border-radius: 5px 5px 0 0;
    }
    .AddressCoverLayer-Content-Title>img{
        float: left;
        margin-right: 10px;
    }
    .AddressCoverLayer-Content-Title>span{
        line-height: 30px;
    }
    .AddressCoverLayer-Content-Title-X{
        float: right !important;
        margin-top: 5px;
        cursor: pointer;
    }
    .AddressCoverLayer-Content-Content{
        padding: 23px 37px;
        font-size: 14px;
    }
    .AddressCoverLayer-Content-Content-Code{
        width: 100%;
        padding-bottom: 30px;
    }
    .AddressCoverLayer-Content-Content-Code>p{
        font-size: 16px;
        color: #ffffff;
    }
    .AddressCoverLayer-Content-Content-Code-Input{
        position: relative;
        width: 100%;
    }
    .AddressCoverLayer-Content-Content-Code-Input>input{
        width: 100%;
        border: 0;
        height: 39px;
        line-height: 39px;
        background-color: transparent;
        border: 1px solid #ffffff;
        border-radius: 5px;
        outline: none;
        padding-left: 14px;
        padding-right: 104px;
        color: #ffffff;
    }
    .AddressCoverLayer-Content-Content-GetCode{
        height: 27px;
        line-height: 27px;
        width: 110px;
        position: absolute;
        text-align: center;
        right: 0;
        top: 6px;
        color: #ffc200;
        border-left: 1px solid #ffffff !important;
        background: transparent;
        border: 0;
        outline: none;
        cursor: pointer;
    }
    .VerificationEmail .AddressCoverLayer-Content-Content-Code-Input>input{
        color: #000000;
        background-color: #dcdcdc;
    }
    .AddressCoverLayer-Content-Content .AddressButton{
        margin-top: 0;
        font-size: 18px;
        color: #ffc200;
        background-color: #1c1f2a;
        border: 0;
    }
    .AddressCoverLayer-Content-Content .AddressButton:hover{
        background-color: #202435;
    }
    #PersonalAssets .AddressButton{
        margin-top: 20px;
        float: right;
        min-width: 140px;
        background-color: #6d7dab;
        border: 1px solid #6d7dab;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        color: #d8d8d8;
        -webkit-appearance: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        -webkit-transition: .1s;
        transition: .1s;
        font-weight: 500;
        padding: 10px 20px;
        font-size: 14px;
        border-radius: 4px;
    }
  #PersonalAssets .AddressButton:hover{
      background-color: #55607e;
  }
  #Currency .el-input__inner{
      background-color: transparent;
      border: none;
  }
  .coin-market-Financial-right-title-Content-ScreenCoin-HideZero{
    float: right !important;
  }
</style>
