<template>
  <section class="container" id="IntegralGrade">
        <section class="IntegralGrade-Title">
            <section class="IntegralGrade-Title-left">
                <section class="IntegralGrade-Title-left-Title">
                    <section class="IntegralGrade-Title-left-Title-left">UID:{{user.fid}}</section>
                    <section class="IntegralGrade-Title-left-Title-right">{{Integral}}: <span>{{user.score}}</span></section>
                    <section v-if="user.ftelephone || user.ftelephone && user.femail" class="IntegralGrade-Title-left-Title-Phone">{{PhoneNumber}}：{{user.ftelephone.substr(0, 3) + '****' + user.ftelephone.substr(7)}}</section>
                    <section v-else-if="user.femail" class="IntegralGrade-Title-left-Title-Phone">
                        {{Email}}：{{user.femail.substr(0, 3) + '****' + user.femail.substr(7)}}
                    </section>
                </section>
                <section class="IntegralGrade-Title-left-Content">
                    <section class="IntegralGrade-Title-left-Content-Img">
                        <img :src="user.level === 6?require('../../assets/img/user/VIPLogo.png'): require('../../assets/img/user/NoVip.png')" alt="">
                    </section>
                    <button class="IntegralGrade-Title-left-Content-Button" v-if="user.level === 6">{{Supermember}}</button>
                    <button class="IntegralGrade-Title-left-Content-Button NotlevelVIP" v-if="user.level !== 6">{{user.level === 0?Ordinarymember:'VIP'+user.level}}</button>
                </section>
            </section>
            <section class="IntegralGrade-Title-right">
                <section class="IntegralGrade-Title-right-Title">
                    <section class="IntegralGrade-Title-right-Title-left">{{MemberGrowthSystem}}</section>
                    <button class="IntegralGrade-Title-right-Title-center" @click="OpenVipClick">{{Vip6State === false?OpenSVIP6:InSVIP6}}</button>
                    <section class="IntegralGrade-Title-right-Title-right">{{OpenSVIP6Year}}</section>
                </section>
                <section class="IntegralGrade-Title-right-Content">
                    <section class="IntegralGrade-Title-right-Content-Line"></section>
                    <section class="IntegralGrade-Title-right-Content-Grade0" :class="{'IntegralGrade-Title-right-Content-GradeColorState': user.level === 0}">
                        <section class="IntegralGrade-Title-right-Content-Grade-Title">{{RegSuccess}}</section>
                        <section class="IntegralGrade-Title-right-Content-Grade-bottom">V0</section>
                    </section>
                    <section class="IntegralGrade-Title-right-Content-Grade1" :class="{'IntegralGrade-Title-right-Content-GradeColorState': user.level === 1}">
                        <section class="IntegralGrade-Title-right-Content-Grade-Title">10,000</section>
                        <section class="IntegralGrade-Title-right-Content-Grade1-top"></section>
                        <section class="IntegralGrade-Title-right-Content-Grade-bottom">V1</section>
                    </section>
                    <section class="IntegralGrade-Title-right-Content-Grade2" :class="{'IntegralGrade-Title-right-Content-GradeColorState': user.level === 2}">
                        <section class="IntegralGrade-Title-right-Content-Grade-Title">100,000</section>
                        <section class="IntegralGrade-Title-right-Content-Grade2-top"></section>
                        <section class="IntegralGrade-Title-right-Content-Grade-bottom">V2</section>
                    </section>
                    <section class="IntegralGrade-Title-right-Content-Grade3" :class="{'IntegralGrade-Title-right-Content-GradeColorState': user.level === 3}">
                        <section class="IntegralGrade-Title-right-Content-Grade-Title">300,000</section>
                        <section class="IntegralGrade-Title-right-Content-Grade3-top"></section>
                        <section class="IntegralGrade-Title-right-Content-Grade-bottom">V3</section>
                    </section>
                    <section class="IntegralGrade-Title-right-Content-Grade4" :class="{'IntegralGrade-Title-right-Content-GradeColorState': user.level === 4}">
                        <section class="IntegralGrade-Title-right-Content-Grade-Title">500,000</section>
                        <section class="IntegralGrade-Title-right-Content-Grade4-top"></section>
                        <section class="IntegralGrade-Title-right-Content-Grade-bottom">V4</section>
                    </section>
                    <section class="IntegralGrade-Title-right-Content-Grade5" :class="{'IntegralGrade-Title-right-Content-GradeColorState': user.level === 5}">
                        <section class="IntegralGrade-Title-right-Content-Grade-Title">1,000,000</section>
                        <section class="IntegralGrade-Title-right-Content-Grade5-top"></section>
                        <section class="IntegralGrade-Title-right-Content-Grade-bottom">V5</section>
                    </section>
                    <section class="IntegralGrade-Title-right-Content-Grade6" :class="{'IntegralGrade-Title-right-Content-GradeState': user.level === 6}">
                        <section class="IntegralGrade-Title-right-Content-Grade-Title">{{PayService}}</section>
                        <section class="IntegralGrade-Title-right-Content-Grade6-top"></section>
                        <section class="IntegralGrade-Title-right-Content-Grade-bottom">V6</section>
                    </section>
                </section>
            </section>
        </section>
        <section class="IntegralGrade-Content">
            <section class="IntegralGrade-Content-Privilege">
                <section class="IntegralGrade-Content-Privilege-Title">{{MemberPrivileges}}</section>
                <section class="IntegralGrade-Content-Privilege-Cnotent">
                    <el-row class="cm-row">
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                <img src="../../assets/img/user/zhuanzhifuwu.png" :alt="FullService">
                            </div>
                            <div class="IntegralGrade-Content-Privilege-Cnotent-Title">{{FullService}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                <img src="../../assets/img/user/kuaisu.png" :alt="FastCharging">
                            </div>
                            <div class="IntegralGrade-Content-Privilege-Cnotent-Title">{{FastCharging}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                <img src="../../assets/img/user/tixing.png" :alt="RiskReminding">
                            </div>
                            <div class="IntegralGrade-Content-Privilege-Cnotent-Title">{{RiskReminding}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                <img src="../../assets/img/user/fuwu.png" :alt="OneToOneService">
                            </div>
                            <div class="IntegralGrade-Content-Privilege-Cnotent-Title">{{OneToOneService}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                <img src="../../assets/img/user/feilv.png" :alt="LowCashRate">
                            </div>
                            <div class="IntegralGrade-Content-Privilege-Cnotent-Title">{{LowCashRate}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                <img src="../../assets/img/user/edu.png" :alt="WithdrawalsQuota">
                            </div>
                            <div class="IntegralGrade-Content-Privilege-Cnotent-Title">{{WithdrawalsQuota}}</div>
                        </el-col>
                    </el-row>
                </section>
            </section>
            <section class="IntegralGrade-Content-Benefit">
                <section class="IntegralGrade-Content-Benefit-Title">{{IntegralBenefit}}</section>
                <section class="IntegralGrade-Content-Benefit-Content">
                    <section class="IntegralGrade-Content-Benefit-Content-Title">
                        <section class="IntegralGrade-Content-Benefit-Content-Title-left">{{MembershipGrade}}</section>
                        <section class="IntegralGrade-Content-Benefit-Content-Title-center">{{Integral}}</section>
                        <section class="IntegralGrade-Content-Benefit-Content-Title-right">USDT</section>
                    </section>
                    <section class="IntegralGrade-Content-Benefit-Content-list">
                        <section class="IntegralGrade-Content-Benefit-Content-list-msg">
                            <section>{{OrdinaryMembership}}</section>
                            <section>0~9,999</section>
                            <section>30,000</section>
                        </section>
                        <section class="IntegralGrade-Content-Benefit-Content-list-msg">
                            <section>VIP1</section>
                            <section>10,000~99,999</section>
                            <section>80,000</section>
                        </section>
                        <section class="IntegralGrade-Content-Benefit-Content-list-msg">
                            <section>VIP2</section>
                            <section>100,000~299,999</section>
                            <section>100,000</section>
                        </section>
                        <section class="IntegralGrade-Content-Benefit-Content-list-msg">
                            <section>VIP3</section>
                            <section>300,000~499,999</section>
                            <section>150,000</section>
                        </section>
                        <section class="IntegralGrade-Content-Benefit-Content-list-msg">
                            <section>VIP4</section>
                            <section>500,000~999,999</section>
                            <section>200,000</section>
                        </section>
                        <section class="IntegralGrade-Content-Benefit-Content-list-msg">
                            <section>VIP5</section>
                            <section>≥1,000,000</section>
                            <section>300,000</section>
                        </section>
                        <section class="IntegralGrade-Content-Benefit-Content-list-msg IntegralGrade-Title-right-Content-Grade6Vip">
                            <section>SVIP6</section>
                            <section>{{PayService}}</section>
                            <section>{{CustomService}}</section>
                        </section>
                    </section>
                </section>
            </section>
            <section class="IntegralGrade-Content-Benefit IntegralGrade-Content-BenefitGet">
                <section class="IntegralGrade-Content-Benefit-Title">{{IntegrationMethod}}</section>
                <section class="IntegralGrade-Content-Benefit-Content">
                    <section class="IntegralGrade-Content-Benefit-Content-Title">
                        <section class="IntegralGrade-Content-Benefit-Content-Title-left">{{Operation}}</section>
                        <section class="IntegralGrade-Content-Benefit-Content-Title-center">{{Integral}}</section>
                        <section class="IntegralGrade-Content-Benefit-Content-Title-right">{{Description}}</section>
                    </section>
                    <section class="IntegralGrade-Content-Benefit-Content-list">
                        <section class="IntegralGrade-Content-Benefit-Content-list-msg">
                            <section>{{Login}}</section>
                            <section>+ 100</section>
                            <section>{{Accumulation}}</section>
                        </section>
                        <section class="IntegralGrade-Content-Benefit-Content-list-msg">
                            <section>{{Recharge}}</section>
                            <section>+ 1</section>
                            <section>{{RechargeMsg}}</section>
                        </section>
                        <section class="IntegralGrade-Content-Benefit-Content-list-msg">
                            <section>{{TradeVolume}}</section>
                            <section>+ 1</section>
                            <section :title="Buy">{{Buy}}</section>
                        </section>
                        <section class="IntegralGrade-Content-Benefit-Content-list-msg">
                            <section>{{NetAssets}}</section>
                            <section>{{NetAssets}} × 0.00001</section>
                            <section>{{GetInteger}}</section>
                        </section>
                        <section class="IntegralGrade-Content-Benefit-Content-list-msg">
                            <section>{{RealNameCertification}}</section>
                            <section>+ 500</section>
                            <section>{{RealNameCertificationMsg}}</section>
                        </section>
                        <section class="IntegralGrade-Content-Benefit-Content-list-msg">
                            <section>{{VerifyPhone}}</section>
                            <section>+ 500</section>
                            <section>{{VerifyPhoneMsg}}</section>
                        </section>
                        <section class="IntegralGrade-Content-Benefit-Content-list-msg">
                            <section>{{VerifyEmail}}</section>
                            <section>+ 500</section>
                            <section>{{VerifyEmailMsg}}</section>
                        </section>
                        <section class="IntegralGrade-Content-Benefit-Content-list-msg">
                            <section>{{VerifyGoogle}}</section>
                            <section>+ 500</section>
                            <section>{{VerifyGoogleMsg}}</section>
                        </section>
                        <section class="IntegralGrade-Content-Benefit-Content-list-msg">
                            <section>{{FirstRecharge}}</section>
                            <section>+ 500</section>
                            <section>{{FirstRechargeMsg}}</section>
                        </section>
                    </section>
                </section>
            </section>
            <section class="IntegralGrade-Content-Benefit IntegralGrade-Content-BenefitGet">
                <section class="IntegralGrade-Content-Benefit-Title">
                    <span>{{IntegrationHistory}}</span>
                    <el-date-picker value-format="yyyy-MM-dd" v-model="DateValue" type="daterange" align="right" :range-separator="To" :start-placeholder="StartDate" :end-placeholder="EndDate"></el-date-picker>
                    <button class="BenefitQuery" @click="BenefitQueryClick">{{Queries}}</button>
                </section>
                <section class="IntegralGrade-Content-Benefit-Content  IntegralGrade-Content-Benefit-Content-LoadingState">
                    <my-Wave v-show="LoadingState" :ParentHeight="277"></my-Wave>
                    <section class="IntegralGrade-Content-Benefit-Content-Title">
                        <section class="IntegralGrade-Content-Benefit-Content-Title-left">{{Operation}}</section>
                        <section class="IntegralGrade-Content-Benefit-Content-Title-center">{{Type}}</section>
                        <section class="IntegralGrade-Content-Benefit-Content-Title-right">{{GetIntegral}}</section>
                    </section>
                    <section v-show="LoadingState === false" class="IntegralGrade-Content-Benefit-Content-list IntegralGrade-Content-Benefit-Content-LoadingStateList">
                        <section v-if="IntegralHistory.data.length > 0" class="IntegralGrade-Content-Benefit-Content-list-msg" v-for="(item, index) in IntegralHistory.data" :key="index">
                            <section>{{new Date(item.fcreatetime).format("yyyy-MM-dd hh:mm:ss")}}</section>
                            <section>{{item.ftype_s}}</section>
                            <section>{{item.fscore}}</section>
                        </section>
                        <section v-else>{{ItNoGetIntegral}}</section>
                    </section>
                    <el-pagination class="IntegralGrade-Content-Benefit-Content-Page" v-show="IntegralHistory.totalRows > IntegralHistory.pageSize" :page-size="IntegralHistory.pageSize" @current-change="handleCurrentChange" layout="prev, pager, next" :total="IntegralHistory.totalRows"></el-pagination>
                </section>
                <section class="IntegralGrade-Content-Bottom">
                    <p>{{Prompt1}}</p>
                    <p>{{Prompt2}}</p>
                    <p>{{Prompt3}} <nuxt-link :to="{path: `/home/About/8`, query: {id: 8, name: this.AboutTitle8}}">{{this.AboutTitle8}}</nuxt-link></p>
                    <p>{{Prompt4}}</p>
                </section>
            </section>
        </section>
        <transition name="el-fade-in-linear">
            <section id="IntegralGradeOpenVip" v-show="OpenVipClickState">
                <section class="IntegralGradeOpenVip-Content">
                    <section class="IntegralGradeOpenVip-Content-Title">
                        {{OpenSVIP6Title}}
                    </section>
                    <img src="../../assets/img/CurrencyLogo/x.png" alt="" @click="OpenVipClickClose">
                    <section class="IntegralGradeOpenVip-Content-Content">
                        <section class="IntegralGradeOpenVip-Content-Content-Input">
                            <p>{{WithdrawalsPassword}}</p>
                            <input type="password" v-model="tradePwd" :disabled="ImmediatelyState">
                        </section>
                        <section class="IntegralGradeOpenVip-Content-Content-Input">
                            <p>{{PhoneCodeName}}</p>
                            <input type="text" v-model="phoneCode" @input="PlaceholderPhoneCode" :disabled="ImmediatelyState">
                            <button class="IntegralGradeOpenVip-Content-Content-GetCode" type="button" :disabled="PhoneDisabled" @click="GetPhoneCode">{{PhoneBtntxt}}</button>
                        </section>
                        <section class="IntegralGradeOpenVip-Content-Content-Input">
                            <p>{{GoogleCodeName}}</p>
                            <input type="password" v-model="googleCode" :disabled="ImmediatelyState">
                        </section>
                        <section class="IntegralGradeOpenVip-Content-Content-Input">
                            <button class="ImmediatelyOpen" :disabled="ImmediatelyState" :class="ImmediatelyState === false?'ImmediatelyOpenClick':''" @click="ImmediatelyOpen">{{ImmediatelyOpenName}}</button>
                        </section>
                        <p v-show="ImmediatelyState">{{NoIdMsg}}</p>
                        <p v-show="ImmediatelyState"><nuxt-link :to="{path: '/user/security'}">{{ToComplete}}</nuxt-link></p>
                        <section class="IntegralGradeOpenVip-Prompt" v-show="ImmediatelyState">
                            <section>!</section>
                            <p>{{PhoneBind}}</p>
                            <p>{{GoogleAndId}}</p>
                        </section>
                    </section>
                </section>
            </section>
        </transition>
  </section>
</template>

<script>
import {PersonalCenter} from '~/api/PersonalCenter';
import userRequest from '~/api/userRequest';
import md5 from 'js-md5';
import Bus from '~/plugins/bus.js'

export default {
    name: "IntegralGrade",

    data() {
        return{
            LoadingState: true,
            tradePwd: '',
            phoneCode: '',
            totpCode: '',
            googleCode: '',
            PhoneTime: 0,
            PhoneDisabled: false,
            PhoneBtntxt: this.$t('user.IntegralGrade.GetCode'),
            ImmediatelyState: true,
            DateValue: '',
            IntegralHistory: '',
            OpenVipClickState: false,
            Vip6State: false,
            ScoreMsg: {
                currentPage: 1,
                beginDate: '',
                endDate: '',
            },
            user: {
                fid: '',//用户ID
                ftelephone: '',//用户手机号
                femail: '',//用户邮箱
                score: '',//用户积分
                level: '',//Vip等级
            },
            AboutTitle8: this.$t('home.About.AboutTitle8'),
            Integral: this.$t('user.IntegralGrade.Integral'),
            PhoneNumber: this.$t('user.IntegralGrade.PhoneNumber'),
            Email: this.$t('user.IntegralGrade.Email'),
            Supermember: this.$t('user.IntegralGrade.Supermember'),
            Ordinarymember: this.$t('user.IntegralGrade.Ordinarymember'),
            MemberGrowthSystem: this.$t('user.IntegralGrade.MemberGrowthSystem'),
            OpenSVIP6: this.$t('user.IntegralGrade.OpenSVIP6'),
            InSVIP6: this.$t('user.IntegralGrade.InSVIP6'),
            OpenSVIP6Year: this.$t('user.IntegralGrade.OpenSVIP6Year'),
            RegSuccess: this.$t('user.IntegralGrade.RegSuccess'),
            PayService: this.$t('user.IntegralGrade.PayService'),
            MemberPrivileges: this.$t('user.IntegralGrade.MemberPrivileges'),
            FullService: this.$t('user.IntegralGrade.FullService'),
            FastCharging: this.$t('user.IntegralGrade.FastCharging'),
            RiskReminding: this.$t('user.IntegralGrade.RiskReminding'),
            OneToOneService: this.$t('user.IntegralGrade.OneToOneService'),
            LowCashRate: this.$t('user.IntegralGrade.LowCashRate'),
            WithdrawalsQuota: this.$t('user.IntegralGrade.WithdrawalsQuota'),
            IntegralBenefit: this.$t('user.IntegralGrade.IntegralBenefit'),
            MembershipGrade: this.$t('user.IntegralGrade.MembershipGrade'),
            OrdinaryMembership: this.$t('user.IntegralGrade.OrdinaryMembership'),
            CustomService: this.$t('user.IntegralGrade.CustomService'),
            IntegrationMethod: this.$t('user.IntegralGrade.IntegrationMethod'),
            Operation: this.$t('user.IntegralGrade.Operation'),
            Description: this.$t('user.IntegralGrade.Description'),
            Login: this.$t('user.IntegralGrade.Login'),
            Accumulation: this.$t('user.IntegralGrade.Accumulation'),
            Recharge: this.$t('user.IntegralGrade.Recharge'),
            RechargeMsg: this.$t('user.IntegralGrade.RechargeMsg'),
            Buy: this.$t('user.IntegralGrade.Buy'),
            NetAssets: this.$t('user.IntegralGrade.NetAssets'),
            GetInteger: this.$t('user.IntegralGrade.GetInteger'),
            RealNameCertification: this.$t('user.IntegralGrade.RealNameCertification'),
            RealNameCertificationMsg: this.$t('user.IntegralGrade.RealNameCertificationMsg'),
            VerifyPhone: this.$t('user.IntegralGrade.VerifyPhone'),
            VerifyPhoneMsg: this.$t('user.IntegralGrade.VerifyPhoneMsg'),
            VerifyEmail: this.$t('user.IntegralGrade.VerifyEmail'),
            VerifyEmailMsg: this.$t('user.IntegralGrade.VerifyEmailMsg'),
            VerifyGoogle: this.$t('user.IntegralGrade.VerifyGoogle'),
            VerifyGoogleMsg: this.$t('user.IntegralGrade.VerifyGoogleMsg'),
            FirstRecharge: this.$t('user.IntegralGrade.FirstRecharge'),
            FirstRechargeMsg: this.$t('user.IntegralGrade.FirstRechargeMsg'),
            IntegrationHistory: this.$t('user.IntegralGrade.IntegrationHistory'),
            To: this.$t('user.IntegralGrade.To'),
            StartDate: this.$t('user.IntegralGrade.StartDate'),
            EndDate: this.$t('user.IntegralGrade.EndDate'),
            Queries: this.$t('user.IntegralGrade.Queries'),
            Type: this.$t('user.IntegralGrade.Type'),
            GetIntegral: this.$t('user.IntegralGrade.GetIntegral'),
            ItNoGetIntegral: this.$t('user.IntegralGrade.ItNoGetIntegral'),
            Prompt1: this.$t('user.IntegralGrade.Prompt1'),
            Prompt2: this.$t('user.IntegralGrade.Prompt2'),
            Prompt3: this.$t('user.IntegralGrade.Prompt3'),
            Prompt4: this.$t('user.IntegralGrade.Prompt4'),
            OpenSVIP6Title: this.$t('user.IntegralGrade.OpenSVIP6Title'),
            WithdrawalsPassword: this.$t('user.IntegralGrade.WithdrawalsPassword'),
            PhoneCodeName: this.$t('user.IntegralGrade.PhoneCodeName'),
            GoogleCodeName: this.$t('user.IntegralGrade.GoogleCodeName'),
            ImmediatelyOpenName: this.$t('user.IntegralGrade.ImmediatelyOpenName'),
            NoIdMsg: this.$t('user.IntegralGrade.NoIdMsg'),
            ToComplete: this.$t('user.IntegralGrade.ToComplete'),
            PhoneBind: this.$t('user.IntegralGrade.PhoneBind'),
            GoogleAndId: this.$t('user.IntegralGrade.GoogleAndId'),
            GetCode: this.$t('user.IntegralGrade.GetCode'),
            Recapture: this.$t('user.IntegralGrade.Recapture'),
            RateDescription: this.$t('user.IntegralGrade.RateDescription'),
            TradeVolume: this.$t('user.IntegralGrade.TradeVolume'),
        }
    },

    mounted(){
        this.score();
        this.getSecurityLevel();
    },

    methods: {
        PlaceholderPhoneCode(){
            let RegVlaue = this.phoneCode.replace(/[^\u4E00-\u9FA5]/g,'');
            if(RegVlaue !== ''){
              this.phoneCode = "";
            }
        },
        BenefitQueryClick(){
            this.DateValue = this.DateValue?this.DateValue:['',''];
            this.ScoreMsg.beginDate = this.DateValue[0];
            this.ScoreMsg.endDate = this.DateValue[1];
            this.score();
        },

        OpenVipClickClose(){
            this.OpenVipClickState = false;
        },

        //初始化获取状态
        getSecurityLevel(){
            userRequest.getSecurityLevel().then(res => {
                if(res.result.identity.authLevel === 2 && res.result.fuser.fgooglebind === true && res.result.fuser.fistelephonebind === true){
                    this.ImmediatelyState = false;
                }else{
                    this.ImmediatelyState = true;
                }
            });
        },

        OpenVipClick(){
            this.OpenVipClickState = true;
        },

        handleCurrentChange(val) {
            this.ScoreMsg.currentPage = val;
            this.score();
        },

        score(){
            this.LoadingState = true;
            // 获取用户中心积分等级
            userRequest.score(this.ScoreMsg).then((response) => {
                if(response.result.fuser.level === 6){
                    this.Vip6State = true;
                }
                this.user = response.result.fuser;
                this.IntegralHistory = response.result.fscorelogs;
                this.LoadingState = false;
            }).catch((err) => {
                console.log('login err: ', err);
            });
        },

        ImmediatelyOpen(){
            // 用户中心积分等级购买VIP
            let MD5tradePwd = md5(md5(md5(this.tradePwd)));
            let ScoreObj = {
                tradePwd: MD5tradePwd,
                phoneCode: this.phoneCode,
                googleCode: this.googleCode
            }
            PersonalCenter.pay_vip(ScoreObj).then((response) => {
                this.score();
                this.OpenVipClickState = false;
                this.Vip6State = true;
            }).catch((err) => {
                console.log('login err: ', err);
            });
        },

        //短信发送验证码
        GetPhoneCode(){
            let ObjType = {
                type: 128//128 提现短信验证码
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
                this.PhoneBtntxt = this.PhoneTime+this.Recapture;
                setTimeout(this.PhoneTimer, 1000);
            } else{
                this.PhoneTime = 0;
                this.PhoneBtntxt = this.GetCode;
                this.PhoneDisabled=false;
            }
        },

        //跳转费率说明
        AboutDetails(id) {
            let routeData = this.$router.resolve({
                path: '/home/About/'+id,
                query: {
                    id: id,
                    name: this.RateDescription
                }
            });
            window.open(routeData.href, '_blank');
        }
    }
}
</script>

<style>
    .cm-row {
        margin-bottom: 20px;
    }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 110px;
    min-width: 110px;
    text-align: center;
  }
  .grid-content>img{
      margin-top: 30px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
   #IntegralGrade{
       background-color: #333333;
       width: 100%;
       min-height: 500px;
   }
   .IntegralGrade-Title{
       background: url(../../assets/img/user/IntegralGradeTitleBackground.png)  no-repeat center top;
       background-size:100% 100%;
       height: 280px;
   }
   .IntegralGrade-Title-left{
       width: 20%;
       margin-left: 0.5%;
       height: 98%;
       float: left;
       min-width: 200px;
       background-color: rgba(0,0,0, 0.1);
   }
   .IntegralGrade-Title-left-Title{
       width: 100%;
       height: 67px;
       padding: 0 3%;
       position: relative;
       overflow: hidden;
       color: #fff;
   }
   .IntegralGrade-Title-left-Title-left{
        width: 50%;
        float: left;
        padding: 13px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
   }
   .IntegralGrade-Title-left-Title-right{
        width: 50%;
        float: right;
        text-align: right;
        padding: 11px 0;
        line-height: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
   }
   .IntegralGrade-Title-left-Title-right>span{
       color: #ffc200;
   }
   .IntegralGrade-Title-left-Title-Phone{
        float: left;
        padding-bottom: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
   }
   .IntegralGrade-Title-right{
       width: 79%;
       float: right;
   }
   .IntegralGrade-Title-right-Title{
       height: 76px;
       padding: 1%;
   }
   .IntegralGrade-Title-left-Content{
       width: 100%;
       padding: 8% 3%;
       text-align: center;
       position: relative;
       overflow: hidden;
   }
   .IntegralGrade-Title-left-Content-Img{
        width: 40%;
        min-width: 100px;
        height: 100px;
        margin: 0 auto;
   }
   .IntegralGrade-Title-left-Content-Img>img{
       width: 100%;
   }
   .IntegralGrade-Title-left-Content-Button{
        margin-top: 15px;
        max-width: 170px;
        height: 30px;
        line-height: 30px;
        border-radius: 30px;
        border: none;
        outline:none;
        background: linear-gradient(left, #f8dda1, #e5a431);
        font-size: 15px;
        color: #4a2b07;
        width: 94%;
   }
   .IntegralGrade-Title-right-Title-left{
       line-height: 30px;
       font-size: 16px;
        width: 18%;
        min-width: 170px;
        float: left;
        height: 27px;
        color: #ffc200;
   }
   .IntegralGrade-Title-right-Title-center{
        cursor: pointer;
        font-size: 14px;
        float: left;
        text-align: center;
        height: 27px;
        line-height: 27px;
        width: 32%;
        min-width: 245px;
        outline: none;
        color: #4a2b07;
        border: none;
        border-radius: 27px;
        margin: 0 5%;
        background: linear-gradient(left, #f8dda1, #e5a431);
   }
   .IntegralGrade-Title-right-Title-right{
        font-size: 14px;
        float: right;
        text-align: right;
        height: 27px;
        line-height: 27px;
        color: #ffc200;
        border: 1px solid #e5a431;
        border-radius: 27px;
        width: 36%;
        min-width: 276px;
        text-align: center;
   }
   .IntegralGrade-Title-right-Content{
        height: 148px;
        padding: 1%;
        position: relative;
        width: 98%;
   }
   .IntegralGrade-Title-right-Content-Line{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 1px;
        background: linear-gradient(left, #f8dda1, #e5a431);
   }
   .IntegralGrade-Title-right-Content-Grade0, .IntegralGrade-Title-right-Content-Grade1, .IntegralGrade-Title-right-Content-Grade2, .IntegralGrade-Title-right-Content-Grade3, .IntegralGrade-Title-right-Content-Grade4, .IntegralGrade-Title-right-Content-Grade5, .IntegralGrade-Title-right-Content-Grade6{
        width: 25px;
        position: absolute;
        bottom: -10px;
   }
   .IntegralGrade-Title-right-Content-Grade-bottom{
        width: 100%;
        height: 20px;
        background-color: #666666;
        position: absolute;
        border-radius: 4px;
        bottom: 0;
        text-align: center;
        line-height: 20px;
   }
   .IntegralGrade-Title-right-Content-Grade1-top, .IntegralGrade-Title-right-Content-Grade2-top, .IntegralGrade-Title-right-Content-Grade3-top, .IntegralGrade-Title-right-Content-Grade4-top, .IntegralGrade-Title-right-Content-Grade5-top, .IntegralGrade-Title-right-Content-Grade6-top{
        width: 100%;
        border-radius:20px 20px 0 0;
        background-color: #666666;
   }
   .IntegralGrade-Title-right-Content-Grade-Title{
        width: 110px;
        position: absolute;
        top: -20px;
        left: -45px;
        text-align: center;
        color: #ffc200;
   }
   .IntegralGrade-Title-right-Content-Grade1-top{
        height: 20px;
   }
   .IntegralGrade-Title-right-Content-Grade2-top{
       height: 35px;
   }
   .IntegralGrade-Title-right-Content-Grade3-top{
       height: 55px;
   }
   .IntegralGrade-Title-right-Content-Grade4-top{
        height: 75px;
   }
   .IntegralGrade-Title-right-Content-Grade5-top{
       height: 95px;
   }
   .IntegralGrade-Title-right-Content-Grade6-top{
       height: 115px;
   }
   .IntegralGrade-Title-right-Content-Grade0{
        height: 20px;
        margin-left: 5%;
   }
   .IntegralGrade-Title-right-Content-Grade1{
        height: 45px;
        margin-left: 18%;
   }
   .IntegralGrade-Title-right-Content-Grade2{
        height: 60px;
        margin-left: 31%;
   }
   .IntegralGrade-Title-right-Content-Grade3{
        height: 80px;
        margin-left: 44%;
   }
   .IntegralGrade-Title-right-Content-Grade4{
        height: 100px;
        margin-left: 57%;
   }
   .IntegralGrade-Title-right-Content-Grade5{
        height: 120px;
        margin-left: 70%;
   }
   .IntegralGrade-Title-right-Content-Grade6{
        height: 140px;
        margin-left: 83%;
   }
   .IntegralGrade-Title-right-Content-GradeState>section:nth-child(2), .IntegralGrade-Title-right-Content-GradeState>section:nth-child(3){
       background-color: #e5a431;
   }
   .IntegralGrade-Content{
        background-color: #222222;
        padding: 20px;
   }
   .IntegralGrade-Content-Privilege-Title{
       font-size: 16px;
       padding-bottom: 20px;
   }
   .IntegralGrade-Content-Privilege-Cnotent-Title{
       text-align: center;
       font-size: 14px;
   }
   .IntegralGrade-Content-Benefit-Title{
       padding: 22px 0;
       font-size: 16px;
   }
   .IntegralGrade-Content-Benefit-Title>span:nth-child(1){
       margin-right: 20px;
   }
   .IntegralGrade-Content-Benefit-Content{
       position: relative;
   }
   .IntegralGrade-Content-Benefit-Content-Title{
        text-align: center;
        position: relative;
        overflow: hidden;
        padding: 7.5px 1%;
        background-color: #3c3c3c;
        font-size: 15px;
        color: #f6b37f;
        border-radius: 5px;
   }
   .IntegralGrade-Content-Benefit-Content-Title>section{
       width: 33.33%;
       float: left;
       height: 30px;
       line-height: 30px;
   }
   .IntegralGrade-Content-Benefit-Content-Title-center{
        border-left: 1px solid #f6b37f;
        border-right: 1px solid #f6b37f;
   }
   .IntegralGrade-Content-Benefit-Content-list{
       padding: 10px 1%;
       color: #d8d8d8;
   }
   .IntegralGrade-Content-Benefit-Content-LoadingStateList{
       height: 200px;
   }
   .IntegralGrade-Content-Benefit-Content-LoadingState{
       height: 277px;
   }
   .IntegralGrade-Content-Benefit-Content-list-msg{
       background-color: #222222;
       position: relative;
       overflow: hidden;
       text-align: center;
       padding: 5px 0;
        margin: 10px 0;
        border-radius: 5px;
   }
   .IntegralGrade-Content-Benefit-Content-list-msg>section{
        width: 33.33%;
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
   }
   .IntegralGrade-Content-Benefit-Content-list>section:nth-child(1)>section:nth-child(1){
       color: #d8d8d8;
   }
   .IntegralGrade-Title-right-Content-Grade6Vip{
       color: #f6b37f;
   }
   .IntegralGrade-Content-BenefitGet .IntegralGrade-Content-Benefit-Content-list>section>section:nth-child(1){
       color: #d8d8d8 !important;
   }
   .el-date-editor .el-range__close-icon{
        margin-top: -28px;
   }
   .el-pagination{
     background-color: transparent !important;
       text-align: right;
       color: #d8d8d8;
   }
   .IntegralGrade-Content-Bottom{
       padding: 40px 0;
        text-align: center;
   }
   .IntegralGrade-Content-Bottom>p{
       color: #b8b8b8;
       padding: 6px 0;
   }
    #IntegralGradeOpenVip{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0, 0.5);
    }
    .IntegralGradeOpenVip-Content{
        position: fixed;
        left: 50%;
        margin-left: -246px;
        top: 20%;
        background: url(../../assets/img/user/598809321708946893.png);
        background-size: 100% 100%;
        width: 492px;
        padding-bottom: 30px;
    }
    .IntegralGradeOpenVip-Content>img{
        cursor: pointer;
        position: absolute;
        top: 19px;
        right: 19px;
        width: 24px;
    }
    .IntegralGradeOpenVip-Content-Title{
        font-size: 24px;
        color: #4a2b07;
        padding: 20px 50px;
        font-weight: 600;
        text-align: center;
    }
    .IntegralGradeOpenVip-Content-Content{
        padding: 0px 24px;
    }
    .IntegralGradeOpenVip-Content-Content>p{
        text-align: center;
        font-size: 18px;
        color: #4a2b07;
        padding: 6px 0x;
        font-weight: 600;
    }
    .IntegralGradeOpenVip-Content-Content > p >a{
        border-bottom: 2px solid #ffffff;
        color: #ffffff;
    }
    .IntegralGradeOpenVip-Content-Content > p >a:hover{
        color: rgba(0,0,0, 0.5);
    }
    .IntegralGradeOpenVip-Content-Content-Input{
        text-align: center;
        color: #4a2b07;
        padding-bottom: 8px;
        position: relative;
    }
    .IntegralGradeOpenVip-Content-Content-Input>p{
        font-size: 18px;
    }
    .IntegralGradeOpenVip-Content-Content-Input>input{
        width: 70%;
        height: 39px;
        line-height: 39px;
        border: 0;
        border-radius: 10px;
        outline: none;
        padding: 0 8px;
        padding-right: 120px;
    }
    .ImmediatelyOpen{
        cursor: pointer;
        outline: none;
        height: 39px;
        line-height: 39px;
        margin-top: 20px;
        background-color: rgba(0,0,0, 0.5);
        border: 0;
        width: 40%;
        padding: 2px 0px;
        border-radius: 4px;
        text-align: center;
        color: #b1b1b1;
    }
    .ImmediatelyOpenClick{
        color: #000000;
        background-color: #ffffff;
    }
    .ImmediatelyOpenClick:hover{
        background-color: #d1d1d1;
    }
    .IntegralGradeOpenVip-Prompt{
        text-align: center;
        color: #ffffff;
        font-size: 16px;
        padding-top: 40px;
    }
    .IntegralGradeOpenVip-Prompt>section{
        font-size: 30px;
        text-align: center;
        width: 30px;
        height: 30px;
        margin: 0 auto;
        border-radius: 100%;
        border: 1px solid #ffffff;
    }
    .el-row{
        position: inherit;
    }
    .BenefitQuery{
        position: relative;
        border: 0;
        outline: none;
        background-color: royalblue;
        color: #ffffff;
        height: 29px;
        width: 90px;
        margin-left: 10px;
        cursor: pointer;
        font-size: 14px;
        background-color: #4c6997;
        border-radius: 5px;
    }
    .BenefitQuery:hover{
        background-color: #6c6ec4;
    }
    .IntegralGradeOpenVip-Content-Content-GetCode{
        height: 27px;
        line-height: 27px;
        width: 110px;
        position: absolute;
        text-align: center;
        right: 65px;
        top: 38px;
        color: #ffc200;
        border-left: 1px solid #ffc200!important;
        background: transparent;
        border: 0;
        outline: none;
        cursor: pointer;
    }
    .NotlevelVIP{
        background: #999999;
        color: #201f1d;
    }
    .IntegralGrade-Title-right-Content-GradeColorState>section:nth-child(2), .IntegralGrade-Title-right-Content-GradeColorState>section:nth-child(3){
        background: #d8d8d8;
        color: #201f1d;
    }
    .el-range__icon, .el-range-input, .el-range-separator{
        line-height: 24px !important;
        color: #d8d8d8 !important;
    }
    .IntegralGrade-Content-Benefit-Content-Page{
        position: absolute;
        right: 0;
        bottom: 0;
    }
</style>
