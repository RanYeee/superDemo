//
//  RootDetailViewController.m
//  SuperDemo
//
//  Created by Rany on 16/8/25.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "RootDetailViewController.h"
#import "MainViewCell.h"

@interface RootDetailViewController ()<UITableViewDelegate,UITableViewDataSource>

@property (nonatomic ,strong) UITableView *tableView;

@end

@implementation RootDetailViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.tableView = [[UITableView alloc]initWithFrame:self.view.bounds style:UITableViewStyleGrouped];
    
    self.tableView.delegate = self;
    
    self.tableView.dataSource = self;
    
    [self.view addSubview:self.tableView];
    
    
}


#pragma mark - tabelView delegate & dataSource

-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView{
    
    return 1;
}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    
    return self.dataArray.count;
}

-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    
    static NSString *cellID = @"cellId";
    
    
    MainViewCell *cell = nil;
    
    cell = [tableView dequeueReusableCellWithIdentifier:cellID];
    
    if (!cell) {
        
        cell = [MainViewCell loadFromXib];
    }
    
    NSString *decText = [NSString stringWithFormat:@"%@",[_dataArray[indexPath.row] objectForKey:@"dec"]];
    
     NSString *createTime = [NSString stringWithFormat:@"%@",[_dataArray[indexPath.row] objectForKey:@"createTime"]];
    //
    //    cell.textLabel.text = decText;
    //
    //    if (_controllerArr[indexPath.row][@"classArray"]) {
    //
    //        cell.detailTextLabel.text = @"...";
    //    }
    cell.mainTitleLabel.text = decText;
    
    cell.detailTitleLabel.text = createTime;
    
    return cell;
}

-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
    
    return 90;
    
}



-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{
    
    if ([_dataArray[indexPath.row]objectForKey:@"className"]) {
        
        
        NSString *className = [_dataArray[indexPath.row]objectForKey:@"className"];
        
        Class controllerClass = NSClassFromString(className);
        
        id nextVC = [[controllerClass alloc]init];
        
        [self.navigationController pushViewController:nextVC animated:YES];
        
    }
    
    if([_dataArray[indexPath.row]objectForKey:@"classArray"]) {
        
        RootDetailViewController *detailVC = [[RootDetailViewController alloc]init];
        
        detailVC.dataArray = [_dataArray[indexPath.row]objectForKey:@"classArray"];
        
        detailVC.title = [_dataArray[indexPath.row]objectForKey:@"dec"];
        
        [self.navigationController pushViewController:detailVC animated:YES];
        
        
    }else{
        
        return;
    }

}



@end
