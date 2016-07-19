//
//  FormView.m
//  test
//
//  Created by Ducky on 15/12/14.
//  Copyright © 2015年 kinglian. All rights reserved.
//

#import "FormView.h"
#import "FormViewCell.h"
//#import "KLChartModel.h"

@interface FormView ()<UITableViewDelegate, UITableViewDataSource>

{
    
}

@end

@implementation FormView

+ (instancetype)creatFormView{
    return [[[NSBundle mainBundle]loadNibNamed:@"FormView" owner:self options:nil]lastObject];
}

-(void)awakeFromNib{
    
//    [KLNotificationHelp addObserver:self selector:@selector(reloadWithArray:) name:kFormShouldReloadNotification object:nil];
    
    //上拉加载
//    self.tableView.footer = [MJRefreshAutoNormalFooter footerWithRefreshingTarget:self refreshingAction:@selector(loadMoreData)];
}

-(void)reloadWithArray:(NSNotification *)param{
    
    _listArray = [param object];
    
    NSLog(@">>>>%@",param);
    
    [self.tableView reloadSections:[NSIndexSet indexSetWithIndex:0] withRowAnimation:UITableViewRowAnimationNone];
}

-(void)loadMoreData{
    
    if (self.delegate) {
        
        [self.delegate loadMoreData:self];
    }
    
}


#pragma mark - tabelView delegate & dataSource

-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView{
    
    return 1;
}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    
//    return _listArray.count;
    return 3;
}

-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    
    static NSString *cellID = @"formViewCellID";
    
    [tableView registerNib:[UINib nibWithNibName:@"FormViewCell" bundle:nil] forCellReuseIdentifier:cellID];
    
    FormViewCell *cell = (FormViewCell *)[tableView dequeueReusableCellWithIdentifier:cellID];
    
//    KLChartModel *listModel = _listArray[indexPath.row];
//    
//    cell.dateLabel.text = listModel.atDate;
//    
//    cell.timeLabel.text = listModel.atTime;
//    
//    cell.highPreLabel.text = listModel.sp;
//    
//    cell.lowPreLabel.text = listModel.dp;
//    
//    cell.pulseLabel.text = listModel.hr;
    
//    cell.selectionStyle = UITableViewCellSelectionStyleNone;
    
    return cell;
}

//-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
//    
//    
//}
//
//-(CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section{
//    
//}
//
-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{
   
//    [KLNotificationHelp postNotificationName:kShowDataInBloodPressureCell object:_listArray[indexPath.row]];
    NSLog(@"click");
   
}

-(void)dealloc{
    
//    [[NSNotificationCenter defaultCenter]removeObserver:self name:kFormShouldReloadNotification object:nil];
}

@end
