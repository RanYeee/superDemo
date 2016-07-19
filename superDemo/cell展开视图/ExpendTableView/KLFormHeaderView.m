//
//  KLFormHeaderView.m
//  kinglianHealthUser
//
//  Created by Ducky on 16/1/6.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "KLFormHeaderView.h"
#import "KLSugarFormCell.h"
//#import "KLBloodSugarModel.h"

@interface KLFormHeaderView ()<UITableViewDelegate, UITableViewDataSource>

@end

@implementation KLFormHeaderView
-(void)awakeFromNib{
    
//    [KLNotificationHelp addObserver:self selector:@selector(reloadWithArray:) name:kSugarFormShouldReloadNotification object:nil];

}

+ (instancetype)makeFormHeaderView{
    
    return [[[NSBundle mainBundle]loadNibNamed:@"KLFormHeaderView" owner:self options:nil]lastObject];
}

-(void)reloadWithArray:(NSNotification *)param{
    
    _listArray = [param object];
    
    NSLog(@">>>>%@",param);
    
//    [self.tableview reloadSections:[NSIndexSet indexSetWithIndex:0] withRowAnimation:UITableViewRowAnimationNone];
    [self.tableview reloadData];
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
    
    static NSString *cellID = @"SugarFormCellID";
    
    [tableView registerNib:[UINib nibWithNibName:@"KLSugarFormCell" bundle:nil] forCellReuseIdentifier:cellID];
    
    KLSugarFormCell *cell = (KLSugarFormCell *)[tableView dequeueReusableCellWithIdentifier:cellID];
    
//    KLBloodSugarModel *model = _listArray[indexPath.row];
//    
//    cell.dateTimeLabel.text = model.atTime;
//    
//    cell.beforeBreLabel.text = model.kf;
//    
//    cell.afterBreLabel.text = model.zch;
//    
//    cell.beforeLunLabel.text = model.wcq;
//    
//    cell.afterLunLabel.text = model.wch;
//    
//    cell.beforeDinLabel.text = model.wacq;
//    
//    cell.afterDinLabel.text = model.wach;
//    
//    cell.beforeSleepLabel.text = model.sq;
    
    return cell;
}

-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
    
    return 40;
}

//-(CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section{
//    
//}
//
//-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{
//    
//}

@end
